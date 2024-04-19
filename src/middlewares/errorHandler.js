const logger = require("../startup/logger");
const { AppError } = require("../util/error");

// opnly catches error that have been as part of request processing pipeline.
// this is particular to express
module.exports = (error, req, res, next) => {
  logger.error(error.message, error);
  if (error.name === "UnauthorizedError") {
    return res.status(error.statusCode).send({ message: error.message }).end();
  }

  console.log(error.name);
  if (error.name === "ValidationError") {
    return res.status(400).send({
      type: "ValidationError",
      details: error?.details ?? error.message,
    });

    /* return res.status(400).send({
      type: "ValidationError",
      message: error.details[0].message,
    }); */
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      errorCode: error.errorCode,
      message: error.message,
    });
  }

  return res.status(500).send("Something went wrong");
};
