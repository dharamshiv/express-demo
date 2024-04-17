const mongoose = require("mongoose");

const customerModel = mongoose.model(
  "Customer",
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true],
        minLength: 5,
        maxLength: 50,
      },
      isGold: {
        type: Boolean,
        default: false,
      },
      phone: {
        type: String,
        required: [true],
        minLength: 5,
        maxLength: 50,
      },
    },

    { timestamps: true }
  )
);

module.exports = customerModel