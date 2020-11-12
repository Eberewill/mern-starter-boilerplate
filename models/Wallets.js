const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
  walletName: {
    type: String,
    required: true,
  },
  ballance: {
    type: Number,
    default: 0,
  },
});
module.exports = mongoose.model("Wallets", walletSchema);
