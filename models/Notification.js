const mongoose = require("mongoose");

const messsageSchema = new mongoose.Schema({
  message: Object,
  date: Date,
});
module.exports = mongoose.model("Message", messsageSchema);
