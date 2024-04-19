const { Router } = require("express");
const { Container } = require("typedi");

const router = Router();

module.exports = (app) => {
  app.use("/users", router);

  const controller = Container.get("userController");
  router.post("/", controller.postUser);
};
