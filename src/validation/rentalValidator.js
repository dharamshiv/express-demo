const Joi = require("joi");

const validateRental = (item) => {
  const schema = Joi.object({
    customerId: Joi.string().required(),
    movieId: Joi.string().required(),
  });
  return schema.validate(item);
};

module.exports = {
  validateRental,
};
