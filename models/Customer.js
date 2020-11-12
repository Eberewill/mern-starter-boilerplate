const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  phoneNumber: {
    type: Number,
    require: true,
    unique: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },

  pinCode: {
    type: Number,
    maxlength: 4,
  },

  deposites: [
    {
      amount: {
        type: Number,
      },

      created: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  balance: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Customer", customerSchema);
