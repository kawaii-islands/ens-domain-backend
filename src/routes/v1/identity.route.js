const express = require('express');
// const validate = require('../../middlewares/validate');
// const tokenValidation = require('../../validations/token.validation');
const identityController = require('../../controllers/identity.controller');

const router = express.Router();

router.get('/names', identityController.getNames);
router.get('/primary-name', identityController.getPrimaryName);
router.get('/name-detail', identityController.getDetail);

module.exports = router;
