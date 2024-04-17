const { Container } = require("typedi");
const AppError = require("../util/appError");
const { INVALID_GENRE } = require("../constants/errorCodes");

getGenres = async () => {
  const GenreModel = Container.get("genreModel");
  return await GenreModel.find();
};

getGenre = async (id) => {
  const GenreModel = Container.get("genreModel");
  const genre = await GenreModel.findById(id);
  if (!genre) {
    throw new AppError(
      INVALID_GENRE,
      "The Genre with givem id was not found",
      404
    );
  }
  return genre;
};

addGenre = async (name) => {
  const GenreModel = Container.get("genreModel");
  let genre = new GenreModel({ name });
  genre = await genre.save({ name });
  return genre;
};

updateGenre = async (id, name) => {
  const GenreModel = Container.get("genreModel");
  const genre = await GenreModel.findByIdAndUpdate(
    id,
    { name: name },
    { new: true }
  );
  if (!genre) {
    if (!genre) {
      throw new AppError(
        INVALID_GENRE,
        "The Genre with givem id was not found",
        404
      );
    }
  }
  return genre;
};

deleteGenre = async (id) => {
  const GenreModel = Container.get("genreModel");
  const genre = await GenreModel.findByIdAndDelete(id);
  if (!genre) {
    if (!genre) {
      throw new AppError(
        INVALID_GENRE,
        "The Genre with givem id was not found",
        404
      );
    }
  }
  return genre;
};

module.exports = {
  getGenres,
  getGenre,
  addGenre,
  updateGenre,
  deleteGenre,
};
