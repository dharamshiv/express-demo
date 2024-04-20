const { Container } = require("typedi");
const { AppError } = require("../util/error");

getGenres = async () => {
  const genreModel = Container.get("genreModel");
  return await genreModel.find();
};

getGenre = async (id) => {
  const genreModel = Container.get("genreModel");
  const genre = await genreModel.findById(id);
  if (!genre) {
    throw new AppError(404, "The Genre with givem id was not found");
  }
  return genre;
};

addGenre = async (name) => {
  const genreModel = Container.get("genreModel");
  let genre = new genreModel({ name });
  genre = await genre.save({ name });
  return genre;
};

updateGenre = async (id, name) => {
  const genreModel = Container.get("genreModel");
  const genre = await genreModel.findByIdAndUpdate(
    id,
    { name: name },
    { new: true }
  );
  if (!genre) {
    throw new AppError(404, "The Genre with givem id was not found");
  }
  return genre;
};

deleteGenre = async (id) => {
  const genreModel = Container.get("genreModel");
  const genre = await genreModel.findByIdAndDelete(id);
  if (!genre) {
    throw new AppError(404, "The Genre with givem id was not found");
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
