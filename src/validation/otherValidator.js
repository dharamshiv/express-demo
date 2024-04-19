const Joi = require("joi");

// validate id using JOI - library used joi-objectid
const validateId = (id) => {
  const schema = Joi.objectId().required();
  return schema.validate(id);
};

module.exports = {
  validateId,
};
