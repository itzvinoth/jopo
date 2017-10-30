var mongoose = require("mongoose");

// create a schema
var jobsSchema = new mongoose.Schema({
  companyName: String,
  designation: String,
  details: String,
  yearsExp: Number
});
var Jobs = mongoose.model("Jobs", jobsSchema);
module.exports = Jobs;