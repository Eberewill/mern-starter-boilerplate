const mongoose = require('mongoose');
const User = require('./User');

const acountsSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  Ballance: {
    type: Number,
    default: 0
  },
  accountnumber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'accountnumber'
  },
  transactions: [
    {
      transactionname: {
        type: String
      },
      transactiondate: {
        type: Date
      },
      trasactionstatus: {
        type: String
      },
      description: {
        type: String
      }
    }
  ]
});
