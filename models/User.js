const mongoose = require('mongoose');
const Wallet = require('./Wallet');

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  phone: {
    type: Number
  },
  wallet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Wallet'
  },

  date: {
    type: Date,
    default: Date.now
  },
  recipientS: [
    {
      name: {
        type: String
      },
      phone: {
        type: String
      },
      accountNumber: {
        type: String
      }
    }
  ]
});

module.exports = mongoose.model('User', UserSchema);
