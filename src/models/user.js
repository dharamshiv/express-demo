const { required } = require("joi");
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
});

const userModel = mongoose.model("User", schema);

module.exports = {
  userModel,
};
