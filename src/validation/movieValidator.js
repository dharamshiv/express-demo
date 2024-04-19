const Joi = require("joi");

const schema = Joi.object({
  title: Joi.string().min(5).max(255).required(),
  genreId: Joi.objectId().required(),
  numberInStock: Joi.number().min(0).max(255).required(),
  dailyRentalRate: Joi.number().min(0).max(255).required(),
});

const validateMovie = (movie) => {
  return schema.validate(movie);
};

module.exports = {
  validateMovie,
};
