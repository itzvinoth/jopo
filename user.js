var mongoose = require("mongoose");

// create a schema
var userSchema = new mongoose.Schema({
  userName: String,
});

var User = mongoose.model("User", userSchema);

module.exports = User;
