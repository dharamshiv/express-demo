const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(5).max(50).required(),
  phone: Joi.string().min(5).max(50).required(),
  isGold: Joi.boolean(),
});

const validateCustomer = (customer) => {
  return schema.validate(customer);
};

module.exports = {
  validateCustomer,
};
