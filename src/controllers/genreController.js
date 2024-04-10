const { Container } = require("typedi");
const Joi = require("Joi");

const getGenres = async (_, res) => {
  try {
    const genres = await Container.get("genreService").getGenres();
    res.send(genres);
  } catch (e) {
    Container.get("logger").error(e);
  }
};

const getGenre = async (req, res) => {
  try {
    const genreId = parseInt(req.params.id);
    const genre = await Container.get("genreService").getGenre(genreId);
    res.send(genre);
  } catch (e) {
    Container.get("logger").error(e);
  }
};

const addGenre = async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
    const genre = await Container.get("genreService").addGenre(req.body.name);
    res.send(genre);
  } catch (e) {
    Container.get("logger").error(e);
  }
};

updateGenre = async (req, res) => {
  // Validation
  const { error } = validateGenre(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  
  try {
    const genreId = parseInt(req.params.id);
    const genre = await Container.get("genreService").updateGenre(genreId, req.body.name);
    res.send(genre);
  } catch (e) {
    Container.get("logger").error(e);
  }
};

deleteGenre = async (req, res) => {
  try {
    const genreId = parseInt(req.params.id);
    const genre = await Container.get("genreService").deleteGenre(genreId);
    res.send(genre);
  } catch (e) {
    Container.get("logger").error(e);
  }
};

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(genre);
}

module.exports = {
  getGenres,
  getGenre,
  addGenre,
  updateGenre,
  deleteGenre,
};
