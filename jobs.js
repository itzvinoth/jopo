var mongoose = require("mongoose"),
	Schema = mongoose.Schema;

// create a schema
var jobsSchema = new mongoose.Schema({
  _id:Schema.Types.ObjectId,
  companyName: String,
  designation: String,
  details: String,
  yearsExp: Number
});

var Jobs = mongoose.model("Jobs", jobsSchema);

module.exports = Jobs;