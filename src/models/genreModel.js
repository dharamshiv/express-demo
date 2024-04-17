const mongoose = require("mongoose");

const genreModel = mongoose.model(
  "Genre",
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, "Please enter a full name"],
        minLength: 5,
        maxLength: 50,
      },
    },
    { timestamps: true }
  )
);

module.exports = genreModel;
  