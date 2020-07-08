const express = require('express');
const foodServices = require('../services/foodService');

const router = express.Router();

router.get('/', foodServices.getFood);

router.post('/', foodServices.createFood);

router.put('/', foodServices.updateFood);

router.delete('/', foodServices.deleteFood);

module.exports = router;