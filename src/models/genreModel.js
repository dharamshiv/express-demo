const mongoose = require('mongoose');

exports.default = new mongoose.model('Genre', new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a full name'],
      minLength: 5,
      maxLength: 50
    },
  },
  { timestamps: true },
));
