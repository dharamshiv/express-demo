// Important for removing try_catch block in controller and write in one place
// to avoid repetitive try catch block
// factory function
module.exports = (handler) => async (req, res, next) => {
  try {
    await handler(req, res);
  } catch (ex) {
    return next(ex);
  }
};
