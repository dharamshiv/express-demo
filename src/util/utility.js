const throwError = (status, msg) => {
  const error = new Error(msg);
  error.status = status;
  throw error;
}

module.exports = {
  throwError
}