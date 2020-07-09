const express = require('express');
const foodService = require('../services/foodService');

const router = express.Router();

router.get('/', foodService.getFood);

router.post('/', foodService.createFood);

router.put('/', foodService.updateFood);

router.delete('/', foodService.deleteFood);

module.exports = router;