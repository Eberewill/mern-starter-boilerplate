const mongoose = require("mongoose");
const Vaucher = require("./Vaucher");

const rechargeSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  vaucher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vaucher",
  },
  status: String,
});
module.exports = mongoose.model("Recharge", rechargeSchema);
