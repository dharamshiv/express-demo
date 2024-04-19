const { Router } = require("express");
const genre = require("./genre");
const root = require("./root");
const customer = require("./customer");
const movie = require("./movie");
const rental = require("./rental");

const routes = () => {
  const app = Router();
  root(app);
  genre(app);
  customer(app);
  movie(app);
  rental(app);
  return app;
};

module.exports = routes;
