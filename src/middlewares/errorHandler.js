const logger = require("../startup/logger");
const ValidationError = require("../util/validationError");
const AppError = require("../util/appError");

// opnly catches error that have been as part of request processing pipeline.
// this is particular to express
module.exports = (error, req, res, next) => {
  logger.error(error.message, error);
  if (error.name === "UnauthorizedError") {
    return res.status(error.statusCode).send({ message: error.message }).end();
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      errorCode: error.errorCode,
      message: error.message,
      statusCode: error.statusCode
    });
  }

  if (error instanceof ValidationError || error.statusCode === 400) {
    return res.status(error.statusCode).json({
      errorCode: error.errorCode,
      message: error.message,
      statusCode: error.statusCode
    });
  }

  return res.status(500).send("Something went wrong");
};
