const { Container } = require("typedi");

const genreController = require("../controllers/genreController");
const customerController = require("../controllers/customerController");
const movieController = require("../controllers/movieController");
const rentalController = require("../controllers/rentalController");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

module.exports = () => {
  Container.set("genreController", genreController);
  Container.set("customerController", customerController);
  Container.set("movieController", movieController);
  Container.set("rentalController", rentalController);
  Container.set("userController", userController);
  Container.set("authController", authController);
};
