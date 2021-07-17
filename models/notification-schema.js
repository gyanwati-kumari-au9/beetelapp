const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  pincode: String,
  contact: String,
  createdAt: Date
});

module.exports = mongoose.model("notification", notificationSchema);
