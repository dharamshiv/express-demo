const { Container } = require("typedi");
const { AppError } = require("../util/error");
const { INVALID_GENRE, INVALID_MOVIE } = require("../constants/errorCodes");

const getMovies = async () => {
  const movieModel = Container.get("movieModel");
  return await movieModel.find();
};

const getMovie = async (id) => {
  const movieModel = Container.get("movieModel");
  const movie = await movieModel.findById(id);
  if (!movie) {
    throw new AppError(
      INVALID_MOVIE,
      404,
      "The movie with given id was not found"
    );
  }
  return movie;
};

const addMovie = async (item) => {
  const genreModel = Container.get("genreModel");
  const genre = await genreModel.findById(item.genreId);
  if (!genre) {
    throw new AppError(
      INVALID_GENRE,
      404,
      "The Genre with givem id was not found"
    );
  }

  const movieModel = Container.get("movieModel");
  const movie = new movieModel({
    title: item.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: item.numberInStock,
    dailyRentalRate: item.dailyRentalRate,
  });
  await movie.save();
  return movie;
};

const updateMovie = async (id, item) => {
  const genreModel = Container.get("genreModel");
  const genre = await genreModel.findById(item.genreId);
  if (!genre) {
    throw new AppError(INVALID_GENRE, 404, "Invalid Genre");
  }
  const movieModel = Container.get("movieModel");
  const movie = await movieModel.findByIdAndUpdate(
    id,
    {
      title: item.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: item.numberInStock,
      dailyRentalRate: item.dailyRentalRate,
    },
    { new: true }
  );

  if (!movie) {
    throw new AppError(
      INVALID_MOVIE,
      404,
      "The movie with the given id was not found."
    );
  }
  return movie;
};

const deleteMovie = async (id) => {
  const movieModel = Container.get("movieModel");
  const movie = await movieModel.findByIdAndDelete(id);
  if (!movie) {
    throw new AppError(
      INVALID_MOVIE,
      404,
      "The movie with given id was not found."
    );
  }
  return movie;
};

module.exports = {
  getMovies,
  getMovie,
  addMovie,
  updateMovie,
  deleteMovie,
};
