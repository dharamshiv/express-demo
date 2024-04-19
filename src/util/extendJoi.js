/**
 * Adding other third party validator in Joi
 */
const Joi = require("joi");

/**
 * add password validator in joi
 * ex - Joi.password().string().minOfUppercase(1);
 * notice password is a function
 */

const { joiPasswordExtendCore } = require("joi-password");
Joi.password = () => Joi.extend(joiPasswordExtendCore);
// example

/**
 * add object id validation in joi
 * ex - Joi.objectId().required()
 * notice objectId is function
 */
Joi.objectId = require("joi-objectid")(Joi);
