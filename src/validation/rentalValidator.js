const Joi = require("joi");

const schema = Joi.object({
  customerId: Joi.string().required(),
  movieId: Joi.string().required(),
});

const validateRental = (item) => {
  return schema.validate(item);
};

module.exports = {
  validateRental,
};
