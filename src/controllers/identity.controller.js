const catchAsync = require('../utils/catchAsync');
const apiResponse = require('../utils/apiResponse');
const { identityService } = require('../services');

const getNames = catchAsync(async (req, res) => {
  const namesWithExpires = await identityService.getNamesFromAddress(req.query.address);

  return apiResponse.successResponseWithData(res, 'success', namesWithExpires);
});

const getPrimaryName = catchAsync(async (req, res) => {
  const primaryName = await identityService.getPrimaryName(req.query.address);

  return apiResponse.successResponseWithData(res, 'success', `${primaryName}.orai`);
});

const getDetail = catchAsync(async (req, res) => {
  const detail = await identityService.getDetail(req.query.name);

  return apiResponse.successResponseWithData(res, 'success', detail);
});

module.exports = {
  getNames,
  getPrimaryName,
  getDetail,
};
