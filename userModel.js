const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// create a schema
const userSchema = new Schema({
  userName: String,
});
const User = mongoose.model('User', userSchema);

module.exports = User;