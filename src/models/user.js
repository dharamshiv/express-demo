const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 5,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minLength: 5,
    maxLength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 5,
    maxLength: 1024,
  },
  isAdmin: Boolean,
});

// do not replace with arrow function because of this
// arrow function do not have their own this
schema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    process.env.PRIVATE_KEY
  );
};

const userModel = mongoose.model("User", schema);

module.exports = {
  userModel,
};
