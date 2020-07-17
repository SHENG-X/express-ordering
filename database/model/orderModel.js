const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        count: {
          type: Number,
          required: true,
        },
        extra: {
          type: String,
          default: '',
        },
        food: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Food'
        }
      }
    ],
    status: {
      type: String,
      default: 'PENDING', //PENDING, CANCELED, PROCESSING, SHIPPED, COMPLETE
    }
  },
  {
    timestamps: true
  }
);

const orderModel = mongoose.model('Order', orderSchema);

module.exports = orderModel;