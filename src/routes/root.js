const { Router } = require("express");

module.exports = (app) => {
  app.get("/", (req, res) => {
    return res.send("Welcome to expreesdemo app api");
  });
};

