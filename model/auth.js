const mongoose = require("../connection/connection");

const user = mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  password: String,
  role: String,
});

const users = mongoose.model("users", user);

module.exports = users;
