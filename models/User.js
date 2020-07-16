const mongoose = require('mongoose');

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
  date: {
    type: Date,
    default: Date.now
  },
  recipient: [
    {
      name: {},
      accountNumber: {
        type: String
      }
    }
  ]
});

module.exports = mongoose.model('user', UserSchema);
