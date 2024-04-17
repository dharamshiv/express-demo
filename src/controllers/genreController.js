const { Container } = require("typedi");
const ValidationError = require("../util/validationError");
const { VALIDATION_ERROR } = require("../constants/errorCodes");
const { validateGenre } = require("../validation/genreValidator");
const {
  validateId,
  validateIdUsingMongoose,
} = require("../validation/otherValidatior");

const getGenres = async (_, res) => {
  const genres = await Container.get("genreService").getGenres();
  res.send(genres);
};

const getGenre = async (req, res) => {
  const genreId = req.params.id;
  const { error } = validateId(genreId);
  if (error) {
    throw new ValidationError(VALIDATION_ERROR, 400, error.details[0].message);
  }
  const genre = await Container.get("genreService").getGenre(genreId);
  res.send(genre);
};

const postGenre = async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) {
    throw new ValidationError(VALIDATION_ERROR, 400, error.details[0].message);
  }
  const genre = await Container.get("genreService").addGenre(req.body.name);
  res.send(genre);
};

const putGenre = async (req, res) => {
  // Validation
  const { error } = validateGenre(req.body);
  if (error) {
    throw new ValidationError(VALIDATION_ERROR, 400, error.details[0].message);
  }

  const genreId = req.params.id;
  const { error: error2 } = validateId(genreId);
  if (error2) {
    throw new ValidationError(VALIDATION_ERROR, 400, error2.details[0].message);
  }
  const genre = await Container.get("genreService").updateGenre(
    genreId,
    req.body.name
  );
  res.send(genre);
};

deleteGenre = async (req, res) => {
  const genreId = req.params.id;
  const isValid = validateIdUsingMongoose(genreId);
  if (!isValid) {
    throw new ValidationError(VALIDATION_ERROR, 400, "invalid id");
  }
  const genre = await Container.get("genreService").deleteGenre(genreId);
  res.send(genre);
};

module.exports = {
  getGenres,
  getGenre,
  postGenre,
  putGenre,
  deleteGenre,
};
