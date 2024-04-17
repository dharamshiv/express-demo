const { Router } = require("express");
const genre = require("./genre");
const root = require("./root");
const customer = require("./customer");

const routes = () => {
  const app = Router();
  root(app);
  genre(app);
  customer(app);
  return app;
};

module.exports = routes;
