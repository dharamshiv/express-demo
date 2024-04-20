const { Router } = require("express");
const { Container } = require("typedi");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

const router = Router();

module.exports = (app) => {
  app.use("/genres", router);

  const controller = Container.get("genreController");

  // genre routes
  router.get("/", controller.getGenres);
  router.post("/", auth, controller.postGenre);
  router.get("/:id", controller.getGenre);
  router.put("/:id", controller.putGenre);
  router.delete("/:id", [auth, admin], controller.deleteGenre);
};
