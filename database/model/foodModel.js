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
      type: Number,
      default: 0
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    },
  },
);

const FoodModel = mongoose.model('Food', foodSchema);

module.exports = FoodModel;