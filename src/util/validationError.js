class ValidationError extends Error {
  constructor(errorCode, statusCode, message) {
    super(message),
    this.errorCode = errorCode;
    this.statusCode = statusCode;
  }
}

module.exports = ValidationError;