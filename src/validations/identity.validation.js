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

const getControlledNames = {
  query: Joi.object().keys({
    address: Joi.string()
      .required()
      .lowercase()
      .regex(/^0x[a-fA-F\d]{40}$/)
      .message('{{#label}} must be a valid evm address'),
  }),
  page: Joi.number().integer(),
  limit: Joi.number().integer(),
};

module.exports = {
  getNames,
  getNameDetail,
  getControlledNames,
};
