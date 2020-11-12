const mongoose = require("mongoose");

const vaucherSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
  unitPrice: {
    type: Number,
  },
  used: {
    type: Boolean,
  },
});
module.exports = mongoose.model("Vaucher", vaucherSchema);
