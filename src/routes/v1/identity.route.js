const express = require('express');
const validate = require('../../middlewares/validate');
const identityValidation = require('../../validations/identity.validation');
const identityController = require('../../controllers/identity.controller');

const router = express.Router();

router.get('/names', validate(identityValidation.getNames), identityController.getNames);
router.get('/primary-name', validate(identityValidation.getNames), identityController.getPrimaryName);
router.get('/name-detail', validate(identityValidation.getNameDetail), identityController.getNameDetail);

module.exports = router;
