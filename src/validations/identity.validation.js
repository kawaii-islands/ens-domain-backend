const Joi = require('joi');

const getNames = {
  query: Joi.object().keys({
    address: Joi.string()
      .required()
      .regex(/^0x[a-fA-F\d]{40}$/)
      .message('{{#label}} must be a valid evm address'),
  }),
};

const getNameDetail = {
  query: Joi.object().keys({
    name: Joi.string()
      .required()
      .regex(/^.+\.orai$/)
      .message('{{#label}} must end with ".orai"'),
  }),
};

module.exports = {
  getNames,
  getNameDetail,
};
