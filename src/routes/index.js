const { Router } = require("express");
const genre = require("./genre");
const root = require("./root");
const customer = require("./customer");
const movie = require("./movie");
const rental = require("./rental");
const user = require("./user");
const auth = require("./auth");

const routes = () => {
  const app = Router();
  root(app);
  genre(app);
  customer(app);
  movie(app);
  rental(app);
  user(app);
  auth(app);
  return app;
};

module.exports = routes;
