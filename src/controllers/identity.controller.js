const Web3 = require('web3');
const catchAsync = require('../utils/catchAsync');
const apiResponse = require('../utils/apiResponse');
const { identityService } = require('../services');

const getNames = catchAsync(async (req, res) => {
  const namesWithExpires = await identityService.getNamesFromAddress(Web3.utils.toChecksumAddress(req.query.address));
  namesWithExpires.forEach((el) => {
    el.name += '.orai';
  });

  return apiResponse.successResponseWithData(res, 'success', namesWithExpires);
});

const getPrimaryName = catchAsync(async (req, res) => {
  const primaryName = await identityService.getPrimaryName(Web3.utils.toChecksumAddress(req.query.address));

  return apiResponse.successResponseWithData(res, 'success', `${primaryName}.orai`);
});

const getNameDetail = catchAsync(async (req, res) => {
  const name = req.query.name.slice(0, req.query.name.length - 5);
  const detail = await identityService.getDetail(name);

  return apiResponse.successResponseWithData(res, 'success', detail);
});

module.exports = {
  getNames,
  getPrimaryName,
  getNameDetail,
};
