const express = require('express');

const orderService = require('../services/orderService');

const router = express.Router();

router.get('/', orderService.getOrder);

router.post('/', orderService.placeOrder);

router.put('/', orderService.updateOrder);

router.put('/cancel', orderService.cancelOrder);

router.delete('/', orderService.deleteOrder);

module.exports = router;
