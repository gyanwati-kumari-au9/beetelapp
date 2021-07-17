const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const branchSchema = new Schema({
    insitutionName: String,
    branchName: String,
    address: String,
    city: String,
    contactNumber: String,
    branchIncharge: String,
    pinCode:Array,
 
});

module.exports = mongoose.model("branch", branchSchema);
