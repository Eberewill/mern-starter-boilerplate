const mongoose = require('mongoose');
const User = require('./User');
const randomInt = require('random-int');

const walletSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  ballance: {
    type: Number,
    default: 0
  },
  walletId: {
    type: Number
  }
  /** 
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
  walletSchema.methods.generateID = function () {
  var wallet = this;
  const walletId = randomInt(0, 2100909092);
  wallet.walletId = wallet;
};
  */
});

module.exports = mongoose.model('Wallet', walletSchema);
