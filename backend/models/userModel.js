const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username:String,
  fullName: String,
  email: String,
  password: String,

  createdAt: { type: Date, default: Date.now() },

});

module.exports = mongoose.model("User", userSchema);
