const jwt = require("jsonwebtoken");
const { default: Container } = require("typedi");
const { genSalt, hash } = require("bcrypt");
const { pick } = require("lodash");
const { AppError } = require("../util/error");

const registerUser = async (item) => {
  const userModel = await Container.get("userModel");
  let user = await userModel.findOne({
    email: item.email,
  });
  if (user) {
    throw new AppError(409, "User already registered.");
  }

  user = new userModel(pick(item, ["name", "email", "password"]));
  const salt = await genSalt(10);
  user.password = await hash(user.password, salt);
  await user.save();
  const token = user.generateAuthToken();
  return { token, user: pick(user, ["_id", "name", "email"]) };
};

const getUser = async (id) => {
  const userModel = await Container.get("userModel");
  const user = await userModel.findById(id).select("-password");
  return user;
};

module.exports = {
  registerUser,
  getUser,
};
