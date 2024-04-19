const { Container } = require("typedi");
const { validateRental } = require("../validation/rentalValidator");
const { validateId } = require("../validation/otherValidator");

const getRentals = async (req, res) => {
  const rentals = await Container.get("rentalService").getRentals();
  res.send(rentals);
};

const getRental = async (req, res) => {
  const { error } = validateId(req.params.id);
  if (error) throw error;

  const rental = await Container.get("rentalService").getRental(req.params.id);
  res.send(rental);
};

const postRental = async (req, res) => {
  const { error } = validateRental(req.body);
  if (error) throw error;

  const rental = await Container.get("rentalService").addRental(req.body);
  res.send(rental);
};

const deleteRental = async (req, res) => {
  const { error } = validateId(req.params.id);
  if (error) throw error;

  const rental = await Container.get("rentalService").deleteRental(
    req.params.id
  );
  res.send(rental);
};

module.exports = {
  getRentals,
  getRental,
  postRental,
  deleteRental,
};
