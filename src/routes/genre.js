const { Router } = require("express");
const { Container } = require("typedi");

const router = Router();

module.exports = (app) => {
  app.use("/genres", router);

  const controller = Container.get("genreController");

  // genre routes
  router.get("/", controller.getGenres);
  router.post("/", controller.postGenre);
  router.get("/:id", controller.getGenre);
  router.put("/:id", controller.putGenre);
  router.delete('/:id', controller.deleteGenre);
};
