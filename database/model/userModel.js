const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    admin: {
      type: Boolean,
      default: false,
    },
    fname: {
      type: String,
      required: true
    },
    lname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  },
);

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;

