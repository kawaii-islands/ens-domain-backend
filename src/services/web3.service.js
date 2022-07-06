const web3 = require('../utils/web3');
const { contracts } = require('../config/contractAddress');
const baseAbi = require('../abi/base.json');
const controllerAbi = require('../abi/controller.json');
const reverseRegistrarAbi = require('../abi/reverse-registrar.json');
const resolverAbi = require('../abi/resolver.json');
const ensAbi = require('../abi/ens.json');

const contractCall = {
  BASE: {
    call(method, ...params) {
      return web3.read(method, contracts.BASE, baseAbi, params);
    },
  },
  CONTROLLER: {
    call(method, ...params) {
      return web3.read(method, contracts.CONTROLLER, controllerAbi, params);
    },
  },
  REVERSE_REGISTRAR: {
    call(method, ...params) {
      return web3.read(method, contracts.REVERSE_REGISTRAR, reverseRegistrarAbi, params);
    },
  },
  RESOLVER: {
    call(method, ...params) {
      return web3.read(method, contracts.RESOLVER, resolverAbi, params);
    },
  },
  ENS: {
    call(method, ...params) {
      return web3.read(method, contracts.ENS, ensAbi, params);
    },
  },
};

module.exports = contractCall;
