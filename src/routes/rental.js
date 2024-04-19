const { Router } = require("express");
const { Container } = require("typedi");

const router = Router();

module.exports = (app) => {
  app.use("/rentals", router);

  const controller = Container.get("rentalController");

  // rental routes
  router.get("/", controller.getRentals);
  router.post("/", controller.postRental);
  router.get("/:id", controller.getRental);
  router.delete("/:id", controller.deleteRental);
};
