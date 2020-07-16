const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  count: {
    type: Number,
    required: true,
  },
  extra: {
    type: String,
    default: '',
  },
  fid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food'
  }
});

const orderSchema = new mongoose.Schema(
  {
    items: {
      type: [orderItemSchema],
      required: true,
    },
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