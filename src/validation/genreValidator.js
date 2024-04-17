const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(3).required(),
});

const validateGenre = (genre) => {
  return schema.validate(genre);
}

module.exports  = {
  validateGenre
}