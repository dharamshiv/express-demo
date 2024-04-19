const { Router } = require("express");
const { Container } = require("typedi");

const router = Router();

module.exports = (app) => {
  app.use("/movies", router);

  const controller = Container.get("movieController");

  // movie routes
  router.get("/", controller.getMovies);
  router.post("/", controller.postMovie);
  router.get("/:id", controller.getMovie);
  router.put("/:id", controller.putMovie);
  router.delete("/:id", controller.deleteMovie);
};
