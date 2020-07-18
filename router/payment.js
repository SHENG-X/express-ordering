const express = require('express');

const paymentService = require('../services/paymentService');

const router = express.Router();

router.post('/', paymentService.pay);

router.post('/', paymentService.refound);

module.exports = router;
