const { Router } = require("express");
const genre = require("./genre");
const root = require("./root");

const routes = () => {
  const app = Router();
  root(app);
  genre(app);
  return app;
};

module.exports = routes;
