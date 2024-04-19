const Joi = require("joi");

const validateUser = (item) => {
  const schema = Joi.object({
    name: Joi.string().trim().min(5).max(50).required(),
    email: Joi.string().trim().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });
  return schema.validate(item);
};

module.exports = {
  validateUser,
};
