const { AppError } = require("../util/error");

module.exports = (req, res, next) => {
  if (!req.user.isAdmin) {
    throw new AppError(403, "Access Denied");
  }
  next();
};
