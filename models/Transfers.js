const mongoose = require("mongoose");

const transferSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },

  status: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  amount: {
    type: Number,
  },
  serviceFee: {
    type: Number,
  },
  channel: {
    type: Number,
  },
});
module.exports = mongoose.model("Transfers", transferSchema);
