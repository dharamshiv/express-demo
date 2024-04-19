const express = require("express");
const cors = require("cors");
const config = require("../config");
const routes = require("../routes");
const error = require("../middlewares/errorHandler");

module.exports = (app) => {
  /**
   * Helth Checkup
   */
  app.get("/status", (_, res) => {
    res.status(200).end();
  });

  app.head("/status", (_, res) => {
    res.status(200).end();
  });

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable("trust proxy");

  // The magic package that prevents frontend developers going nuts
  // Alternate description:
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // Transforms the raw string of req.body into json
  app.use(express.json());

  // Load API routes
  app.use(config.api.prefix, routes());

  //error handling
  app.use(error);
};
