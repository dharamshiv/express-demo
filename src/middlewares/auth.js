const { verify } = require("jsonwebtoken");
const { AppError, UnauthorizedError } = require("../util/error");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    throw new UnauthorizedError(401, "Aceess Denied. No token provided.");
  }

  try {
    const payload = verify(token, process.env.PRIVATE_KEY);
    req.user = payload;
    next();
  } catch (ex) {
    throw new AppError(403, "Forbidden: Invalid token");
  }
};
