const express = require('express');
const validate = require('../../middlewares/validate');
const maxLimitQuery = require('../../middlewares/maxLimitQuery');
const identityValidation = require('../../validations/identity.validation');
const identityController = require('../../controllers/identity.controller');

const router = express.Router();

router.get('/names', validate(identityValidation.getNames), identityController.getNames);
router.get('/primary-name', validate(identityValidation.getNames), identityController.getPrimaryName);
router.get('/name-detail', validate(identityValidation.getNameDetail), identityController.getNameDetail);
router.get(
  '/controlled-name',
  validate(identityValidation.getControlledNames),
  maxLimitQuery(),
  identityController.getControlledNames
);

module.exports = router;
