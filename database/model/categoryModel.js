const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const CategoryModel = mongoose.model('Category', CategorySchema);

module.exports = CategoryModel;
