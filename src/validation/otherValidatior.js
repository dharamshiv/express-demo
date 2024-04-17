const Joi = require("joi");
const mongoose = require("mongoose");

// validate id using JOI - library used joi-objectid
const validateId = (id) => {
  const schema =  Joi.objectId().required();
  return schema.validate(id);
}

// validate id using mongoose
const validateIdUsingMongoose  = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
}

module.exports = {
  validateId,
  validateIdUsingMongoose
}