const { Container } = require("typedi");
const { validateGenre } = require("../validation/genreValidator");
const { validateId } = require("../validation/otherValidator");

const getGenres = async (_, res) => {
  const genres = await Container.get("genreService").getGenres();
  res.send(genres);
};

const getGenre = async (req, res) => {
  const genreId = req.params.id;
  // validate cunstomer id
  const { error } = validateId(genreId);
  if (error) throw error;

  const genre = await Container.get("genreService").getGenre(genreId);
  res.send(genre);
};

const postGenre = async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) throw error;

  const genre = await Container.get("genreService").addGenre(req.body.name);
  res.send(genre);
};

const putGenre = async (req, res) => {
  // Validation
  const { error } = validateGenre(req.body);
  if (error) throw error;

  const genreId = req.params.id;
  const { error: error2 } = validateId(genreId);
  if (error2) throw error2;

  const genre = await Container.get("genreService").updateGenre(
    genreId,
    req.body.name
  );
  res.send(genre);
};

deleteGenre = async (req, res) => {
  const id = req.params.id;
  const { error } = validateId(id);

  if (error) throw error;
  const genre = await Container.get("genreService").deleteGenre(id);
  res.send(genre);
};

module.exports = {
  getGenres,
  getGenre,
  postGenre,
  putGenre,
  deleteGenre,
};
