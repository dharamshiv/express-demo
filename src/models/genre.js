const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a full name"],
      minLength: 5,
      maxLength: 50,
    },
  },
  { timestamps: true }
);

const genreModel = mongoose.model("Genre", genreSchema);

module.exports = {
  genreSchema,
  genreModel,
};
