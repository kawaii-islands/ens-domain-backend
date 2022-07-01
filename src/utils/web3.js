const Web3 = require('web3');
const config = require('../config/config');

let web3;
/**
 * Initialize web3 instance
 */
const init = () => {
  if (!web3) {
    web3 = new Web3(config.provider.subnet.http, { keepAlive: true });
  }
};

/**
 * Read data from contract through call method
 * @param {string} method
 * @param {string} contractAddress
 * @param {Object} abi
 * @param {Array<*>} args
 * @returns {Promise<*>}
 */
const read = async (method, contractAddress, abi, args) => {
  try {
    const contr = new web3.eth.Contract(abi, contractAddress);
    return contr.methods[method](...args).call();
  } catch (e) {
    console.error('method:', method);
    console.error('contract address:', contractAddress);
    console.error('args:', args);
    throw e;
  }
};

const getInstance = () => web3;

module.exports = {
  init,
  read,
  getInstance,
};
