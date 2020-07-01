const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema(
  {
    image: {
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

const FoodModel = mongoose.model('Food', foodSchema);

module.exports = FoodModel;