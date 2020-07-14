const express = require('express');
const categoryService = require('../services/categoryService');

const router = express.Router();

router.get('/', categoryService.getCategory);

router.post('/', categoryService.createCategory);

router.put('/', categoryService.updateCategory);

router.delete('/', categoryService.deleteCategory);

module.exports = router;