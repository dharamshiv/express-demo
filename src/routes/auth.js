const { Router } = require("express");
const { Container } = require("typedi");

const router = Router();

module.exports = (app) => {
  app.use("/auth", router);

  const controller = Container.get("authController");
  router.post("/", controller.postUser);
};
