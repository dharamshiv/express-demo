const { Router } = require("express");
const { Container } = require("typedi");
const auth = require("../middlewares/auth");

const router = Router();

module.exports = (app) => {
  app.use("/users", router);

  const controller = Container.get("userController");
  router.get("/me", auth, controller.getMe);
  router.post("/", controller.postUser);
};
