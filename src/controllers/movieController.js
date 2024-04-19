const { Container } = require("typedi");
const { validateMovie } = require("../validation/movieValidator");
const { validateId } = require("../validation/otherValidator");

const getMovies = async (_, res) => {
  const movies = await Container.get("movieService").getMovies();
  res.send(movies);
};

const getMovie = async (req, res) => {
  const id = req.params.id;
  const { error } = validateId(id);
  if (error) throw error;
  const movie = await Container.get("movieService").getMovie(id);
  res.send(movie);
};

const postMovie = async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) throw error;
  const movie = await Container.get("movieService").addMovie(req.body);
  res.send(movie);
};

const putMovie = async (req, res) => {
  // Validation
  const { error } = validateMovie(req.body);
  if (error) throw error;

  const id = req.params.id;
  const { error: error2 } = validateId(id);
  if (error2) throw error2;

  const movie = await Container.get("movieService").updateMovie(id, req.body);
  res.send(movie);
};

const deleteMovie = async (req, res) => {
  const id = req.params.id;
  const { error } = validateId(id);
  if (error) throw error;
  const movie = await Container.get("movieService").deleteMovie(id);
  res.send(movie);
};

module.exports = {
  getMovies,
  getMovie,
  postMovie,
  putMovie,
  deleteMovie,
};
