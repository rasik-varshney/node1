const mongoose = require("mongoose");
const schema = mongoose.Schema;

const User = new schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  isPromoted: Boolean,
});

const user = mongoose.model("users", User);

module.exports = user;