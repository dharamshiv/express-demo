const { Router } = require("express");
const { Container } = require("typedi");

const router = Router();

module.exports = (app) => {
  app.use("/genres", router);

  const controller = Container.get("genreController");

  // get all genres
  router.get("/", controller.getGenres);
  router.post("/", controller.addGenre);
  router.get("/:id", controller.getGenre);
  router.put("/:id", controller.updateGenre);
  router.delete('/:id', controller.deleteGenre);
};
