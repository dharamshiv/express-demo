// handles async errors
require("express-async-errors");
require("reflect-metadata");

// read .env file
require("dotenv").config();

const fs = require("fs");
const https = require("https");
const express = require("express");

// added objectId validation
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const startup = require("./startup");

async function startServer() {
  const app = express();

  // startup
  startup(app);

  // await Promise.reject("Rejected Promise")

  // https server
  const privateKey = fs.readFileSync("./sslcert/server.key", "utf8");
  const certificate = fs.readFileSync("./sslcert/server.crt", "utf8");
  const options = {
    key: privateKey,
    cert: certificate,
    hostname: config.port,
  };
  const httpsServer = https.createServer(options, app);
  httpsServer
    .listen(config.port, () => {
      console.log(`Server running at https://${config.host}:${config.port}/`);
    })
    .on("error", (err) => {
      console.log(err);
      process.exit(1);
    });

  //
}
// throw new Error("unhandled exception!");
startServer();
