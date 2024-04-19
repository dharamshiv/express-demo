const { default: Container } = require("typedi");
const { genSalt, hash } = require("bcrypt");
const { pick } = require("lodash");
const { AppError } = require("../util/error");
const { USER_EXIST } = require("../constants/errorCodes");

const registerUser = async (item) => {
  const userModel = await Container.get("userModel");
  let user = await userModel.findOne({
    email: item.email,
  });
  if (user) {
    throw new AppError(USER_EXIST, 409, "User already registered.");
  }

  user = new userModel(pick(item, ["name", "email", "password"]));
  const salt = await genSalt(10);
  user.password = await hash(user.password, salt);
  await user.save();
  return pick(user, ["_id", "name", "email"]);
};

module.exports = {
  registerUser,
};
