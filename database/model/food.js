const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const food = new Schema(
  {
    previewImage: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: '',
    },
    price: {
      type: Double,
      default: 0
    },
  },
);

const Food = mongoose.model('Food', food);

module.exports = Food;