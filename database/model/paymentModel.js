const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    clientSecret: {
      type: String,
      required: true,
    },
    complete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const paymentModel = mongoose.model('Payment', paymentSchema);

module.exports = paymentModel;
