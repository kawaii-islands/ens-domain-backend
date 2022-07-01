const httpStatus = require('http-status');

exports.successResponse = function (res, msg) {
  const data = {
    message: msg,
  };
  return res.status(httpStatus.OK).json(data);
};

exports.successResponseWithData = function (res, msg, data, option) {
  const resData = {
    message: msg,
    data,
    option,
  };
  return res.status(httpStatus.OK).json(resData);
};

exports.ErrorResponse = function (res, msg) {
  const data = {
    message: msg,
  };
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(data);
};

exports.notFoundResponse = function (res, msg) {
  const data = {
    message: msg,
  };
  return res.status(httpStatus.NOT_FOUND).json(data);
};

exports.validationErrorWithData = function (res, msg, data) {
  const resData = {
    message: msg,
    data,
  };
  return res.status(httpStatus.BAD_REQUEST).json(resData);
};
