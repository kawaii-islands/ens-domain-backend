const axios = require('axios');
const mongoose = require('mongoose');
const Web3 = require('web3');
const config = require('../config/config');
const web3Service = require('../services/web3.service');
const identityService = require('../services/identity.service');
const web3Util = require('../utils/web3');
const { Custom, Name } = require('../models');

const apiUrl = 'https://developers.kawaii.global/mintscan/v1/logs';
const topic0 = '0xce0457fe73731f824cc272376169235128c118b49d344817417c6d108d155e82';
const trackKey = 'worker.scanNewOwnerEvent';
const errorTimeout = 1e4;
const skip = {
  blockNumber: 0,
  logIndex: 0,
};

const label2Name = async (label) => {
  const id = Web3.utils.hexToNumberString(label);
  const nodeHash = identityService.idToNodeHash(id);
  return web3Service.CONTROLLER.call('nodeHash2Name', nodeHash);
};

const run = async () => {
  try {
    const track = await Custom.findOne({ key: trackKey });
    if (track) {
      skip.blockNumber = track.value.blockNumber;
      skip.logIndex = track.value.logIndex;
    }

    let page = 1;
    let totalPage = 0;
    const limit = 100;
    do {
      console.log('skip:', skip);
      console.log('page:', page);

      const resp = await axios(apiUrl, {
        params: {
          topic0,
          fromBlock: skip.blockNumber,
          page_id: page,
          limit,
        },
      });
      totalPage = resp.data.page.total_page;
      const { data } = resp.data;
      const newData = data.filter(
        (el) =>
          el.block_number > skip.blockNumber || (el.block_number === skip.blockNumber && el.log_index > skip.logIndex)
      );
      if (!newData.length) {
        page++;
        continue;
      }
      let success = true;
      const session = await mongoose.connection.startSession();
      session.startTransaction();
      try {
        // update name's owner
        for (const log of newData) {
          const name = await label2Name(log.topics[2]);
          if (!name.length) {
            continue;
          }
          const owner = `0x${log.topics[3].substring(26)}`;
          await Name.updateOne({ name }, { owner }, { upsert: true, session });
        }
        // update track
        const lastLog = newData.slice(-1)[0];
        await Custom.updateOne(
          { key: trackKey },
          {
            value: {
              blockNumber: lastLog.block_number,
              logIndex: lastLog.log_index,
            },
          },
          {
            upsert: true,
            session,
          }
        );

        await session.commitTransaction();
      } catch (e) {
        await session.abortTransaction();
        console.warn('Transaction aborted.');
        console.error('Error:', e);
        success = false;
      } finally {
        session.endSession();
      }
      if (success) {
        page++;
      } else {
        await new Promise((resolve) => setTimeout(resolve, errorTimeout));
      }
    } while (page <= totalPage);

    console.info('Sleep 10 minutes');
    setTimeout(run, 6e5);
  } catch (e) {
    console.error('Error:', e);
    console.info('Sleep 1 minutes');
    setTimeout(run, 6e4);
  }
};

web3Util.init();
mongoose.connect(config.mongoose.url, config.mongoose.options).then(run);
