const keccak256 = require('keccak256');
const { Uint256 } = require('soltypes');
const Web3 = require('web3');
const contentHashNew = require('content-hash');
const web3Util = require('../utils/web3');
const web3Service = require('./web3.service');

/**
 * Get node hash from id
 * @param {string} id
 * @returns {string}
 */
const idToNodeHash = (id) => {
  const uint256Id = Uint256.from(id);
  const web3 = web3Util.getInstance();

  return Web3.utils.sha3(
    web3.eth.abi.encodeParameters(
      ['bytes32', 'bytes32'],
      ['0x197784d4b926339fbac1d9fd91d5a00ddc4d2b793ded0f942456adf0300044af', uint256Id.toBytes().val]
    )
  );
};

/**
 * Get names and expires from address
 * @param {string} address
 * @returns {Promise<Object[]>}
 */
const getNamesFromAddress = async (address) => {
  const balance = +(await web3Service.balanceOf(address));
  const ids = await Promise.all(
    Array(balance)
      .fill()
      .map((_, idx) => web3Service.tokenOfOwnerByIndex(address, idx))
  );

  const names = await Promise.all(
    ids.map((id) => {
      const nodeHash = idToNodeHash(id);
      return web3Service.nodeHash2Name(nodeHash);
    })
  );

  const expires = await Promise.all(ids.map((id) => web3Service.nameExpires(id)));
  return ids.map((_, idx) => ({ name: `${names[idx]}.orai`, expire: expires[idx] }));
};

/**
 * Get primary name of address
 * @param {string} address
 * @returns {Promise<string>}
 */
const getPrimaryName = async (address) => {
  const node = await web3Service.node(address);
  return web3Service.name(node);
};

/**
 * Check if name is available
 * @param {string} name
 * @returns {Promise<boolean>}
 */
const isAvailable = async (name) => {
  return web3Service.available(name);
};

const nameToId = (name) => {
  const convertStrToBytes = `0x${keccak256(Web3.utils.asciiToHex(name)).toString('hex')}`;
  return Web3.utils.hexToNumberString(convertStrToBytes);
};

/**
 * Create node hash from name
 * @param {string} name
 * @returns {string}
 */
const createNodeHashFromName = (name) => {
  const id = nameToId(name);
  return idToNodeHash(id);
};

/**
 * Get resolver of name
 * @param {string} name
 * @returns {Promise<string>}
 */
const getResolver = async (name) => {
  const nodeHash = createNodeHashFromName(name);
  return web3Service.resolver(nodeHash);
};

/**
 * Get controller of name
 * @param {string} name
 * @returns {Promise<string>}
 */
const getController = async (name) => {
  const nodeHash = createNodeHashFromName(name);
  return web3Service.owner(nodeHash);
};

/**
 * Get expire time of name
 * @param name
 * @returns {Promise<*>}
 */
const getNameExpire = async (name) => {
  const id = nameToId(name);
  return web3Service.nameExpires(id);
};

const getRegistrant = async (name) => {
  const id = nameToId(name);
  return web3Service.ownerOf(id);
};

/**
 * Get list address of a name
 * @param name
 * @returns {Promise<string[]>}
 */
const getAddressesOfName = async (name) => {
  const nodeHash = createNodeHashFromName(name);
  // 60: is ETH
  // 0: is ORAI
  // 1: is ORAIDEX
  const addresses = await Promise.all([60, 0, 1].map((el) => web3Service.addr(nodeHash, el)));

  return addresses.map((address, idx) => {
    if (idx === 0) return address;
    return address ? Web3.utils.hexToAscii(address) : '';
  });
};

const getContentHashOfName = async (name) => {
  const nodeHash = createNodeHashFromName(name);
  const content = await web3Service.contenthash(nodeHash);
  if (!content) {
    return '';
  }
  return contentHashNew.decode(content);
};

const getListRecords = async (name) => {
  const listRecords = [
    'snapshot',
    'cname',
    'email',
    'url',
    'avatar',
    'description',
    'notice',
    'keywords',
    'com.discord',
    'com.github',
    'com.reddit',
    'com.twitter',
    'org.telegram',
    'eth.ens.delegate',
  ];
  const nodeHash = createNodeHashFromName(name);
  const records = await Promise.all(listRecords.map((el) => web3Service.text(nodeHash, el)));

  const recordInput = {};
  listRecords.forEach((key, idx) => {
    recordInput[key] = records[idx];
  });

  return recordInput;
};

const getDetail = async (name) => {
  const isNameAvailable = await isAvailable(name);
  const resolver = await getResolver(name);
  const controller = await getController(name);
  const expires = await getNameExpire(name);
  const registrant = await getRegistrant(name);
  const addresses = await getAddressesOfName(name);
  const content = await getContentHashOfName(name);
  const listRecords = await getListRecords(name);

  return {
    isAvailable: isNameAvailable,
    resolver,
    controller,
    expires,
    registrant,
    addresses,
    content,
    listRecords,
  };
};

module.exports = {
  getNamesFromAddress,
  getPrimaryName,
  getDetail,
};
