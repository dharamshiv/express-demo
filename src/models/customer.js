const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
  },
  isGold: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    minLength: 5,
    maxLength: 50,
  },
});

const customerModel = mongoose.model("Customer", customerSchema);

module.exports = {
  customerSchema,
  customerModel,
};
