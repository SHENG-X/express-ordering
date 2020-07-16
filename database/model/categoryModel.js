const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
});

const CategoryModel = mongoose.model('Category', CategorySchema);

module.exports = CategoryModel;
