const jwt = require("jsonwebtoken");
const { default: Container } = require("typedi");
const { compare } = require("bcrypt");
const { UnauthorizedError } = require("../util/error");

const validateUser = async (item) => {
  const userModel = await Container.get("userModel");

  let user = await userModel.findOne({
    email: item.email,
  });
  if (!user) {
    throw new UnauthorizedError(401, "Invalid email or password");
  }

  const isValid = await compare(item.password, user.password);
  if (!isValid) {
    throw new UnauthorizedError(401, "Invalid email or password");
  }

  return user.generateAuthToken();
};

module.exports = {
  validateUser,
};
