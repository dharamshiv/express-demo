const { Container } = require("typedi");

const { genreModel } = require("../models/genre");
const { customerModel } = require("../models/customer");
const { movieModel } = require("../models/movie");
const { rentalModel } = require("../models/rental");
const { userModel } = require("../models/user");

module.exports = () => {
  Container.set("genreModel", genreModel);
  Container.set("customerModel", customerModel);
  Container.set("movieModel", movieModel);
  Container.set("rentalModel", rentalModel);
  Container.set("userModel", userModel);
};
