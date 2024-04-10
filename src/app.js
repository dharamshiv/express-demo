const fs = require("fs");
const https = require("https");
const express = require("express");
const loaders = require("./loaders")

async function startServer() {
  const app = express();
  // loaders
 
  loaders({expressApp: app})
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
      console.log(
        `Server running at https://${config.host}:${config.port}/`
      );
    })
    .on("error", (err) => {
      console.log(err);
      process.exit(1);
    });
}

startServer();
