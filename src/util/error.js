class AppError extends Error {
  constructor(errorCode, statusCode, message) {
    super(message);
    this.errorCode = errorCode;
    this.statusCode = statusCode;
  }
}

class UnauthorizedError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = {
  AppError,
  UnauthorizedError,
};
