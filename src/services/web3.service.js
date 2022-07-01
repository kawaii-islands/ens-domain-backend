const web3 = require('../utils/web3');
const { contracts } = require('../config/contractAddress');
const baseAbi = require('../abi/base.json');
const controllerAbi = require('../abi/controller.json');
const reverseRegistrarAbi = require('../abi/reverse-registrar.json');
const resolverAbi = require('../abi/resolver.json');
const ensAbi = require('../abi/ens.json');

const balanceOf = async (address) => {
  return web3.read('balanceOf', contracts.BASE, baseAbi, [address]);
};

const tokenOfOwnerByIndex = async (address, index) => {
  return web3.read('tokenOfOwnerByIndex', contracts.BASE, baseAbi, [address, index]);
};

const nameExpires = async (id) => {
  return web3.read('nameExpires', contracts.BASE, baseAbi, [id]);
};

const nodeHash2Name = async (data) => {
  return web3.read('nodeHash2Name', contracts.CONTROLLER, controllerAbi, [data]);
};

const node = async (address) => {
  return web3.read('node', contracts.REVERSE_REGISTRAR, reverseRegistrarAbi, [address]);
};

const name = async (myNode) => {
  return web3.read('name', contracts.RESOLVER, resolverAbi, [myNode]);
};

const available = async (myName) => {
  return web3.read('available', contracts.CONTROLLER, controllerAbi, [myName.slice(0, myName.length - 5)]);
};

const resolver = async (nodeHash) => {
  return web3.read('resolver', contracts.ENS, ensAbi, [nodeHash]);
};

const owner = async (nodeHash) => {
  return web3.read('owner', contracts.ENS, ensAbi, [nodeHash]);
};

const ownerOf = async (id) => {
  return web3.read('ownerOf', contracts.BASE, baseAbi, [id]);
};

const addr = async (nodeHash, id) => {
  return web3.read('addr', contracts.RESOLVER, resolverAbi, [nodeHash, id]);
};

const contenthash = async (nodeHash) => {
  return web3.read('contenthash', contracts.RESOLVER, resolverAbi, [nodeHash]);
};

const text = async (nodeHash, item) => {
  return web3.read('text', contracts.RESOLVER, resolverAbi, [nodeHash, item]);
};

module.exports = {
  balanceOf,
  tokenOfOwnerByIndex,
  nameExpires,
  nodeHash2Name,
  node,
  name,
  available,
  resolver,
  owner,
  ownerOf,
  addr,
  contenthash,
  text,
};
