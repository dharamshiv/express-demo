const { Container } = require("typedi");
const {
  INVALID_RENTAL,
  INVALID_CUSTOMER,
  INVALID_MOVIE,
} = require("../constants/errorCodes");
const { AppError } = require("../util/error");
const rentalModel = require("../models/rental");

const getRentals = async () => {
  const rentalModel = Container.get("rentalModel");
  const rentals = await rentalModel.find();
  return rentals;
};

const getRental = async (id) => {
  const rentalModel = Container.get("rentalModel");
  const rental = await rentalModel.findById(id);
  if (!rental) {
    throw new AppError(
      INVALID_RENTAL,
      404,
      "The rental with the given ID not found."
    );
  }
  return rental;
};

const addRental = async (item) => {
  const customerModel = Container.get("customerModel");
  const customer = await customerModel.findById(item.customerId);
  if (!customer) {
    throw new AppError(INVALID_CUSTOMER, 404, "Invalid customer");
  }
  const movieModel = Container.get("movieModel");
  const movie = await movieModel.findById(item.movieId);
  console.log(movie);
  if (!movie) {
    throw new AppError(INVALID_MOVIE, 404, "Invalid movie.");
  }

  if (movie.numberInStock === 0) {
    throw new AppError(INVALID_MOVIE, 404, "Movie not in stock");
  }

  const rentalModel = Container.get("rentalModel");

  let rental = new rentalModel({
    customer: {
      _id: customer.id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie.id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });
  rental = await rental.save();

  movie.numberInStock--;
  await movie.save();
  return rental;
};

const deleteRental = async (id) => {
  console.log(id);
  const rentalModel = Container.get("rentalModel");
  let rental = await rentalModel.findById(id);
  if (!rental) throw new AppError(INVALID_RENTAL, 404, "Invalid rental.");

  const movieModel = Container.get("movieModel");
  const movie = await movieModel.findById(rental.movie._id);
  if (!movie) throw new AppError(INVALID_MOVIE, 404, "Invalid movie.");

  rental = await rentalModel.findByIdAndDelete(id);

  movie.numberInStock++;
  await movie.save();

  return rental;
};

module.exports = {
  getRentals,
  getRental,
  addRental,
  deleteRental,
};
