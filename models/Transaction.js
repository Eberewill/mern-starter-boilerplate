const mongoose = require('mongoose');
const user = require('../models/User');

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: user
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date
  },
  status: {
    type: String
  },
  message: {
    type: String
  }
});
