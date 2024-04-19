const { Container } = require("typedi");
const genreService = require("../services/genereService");
const customerService = require("../services/customerService");
const movieService = require("../services/movieService");
const rentalService = require("../services/rentalService");
const userService = require("../services/userService");
const authService = require("../services/authService");

module.exports = () => {
  Container.set("genreService", genreService);
  Container.set("customerService", customerService);
  Container.set("movieService", movieService);
  Container.set("rentalService", rentalService);
  Container.set("userService", userService);
  Container.set("authService", authService);
};
