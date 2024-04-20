const { Container } = require("typedi");

const { validateUser } = require("../validation/userValidator");

const getMe = async (req, res) => {
  const user = await Container.get("userService").getUser(req.user._id);
  res.send(user);
};

const postUser = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) throw error;

  const user = await Container.get("userService").registerUser(req.body);
  res.header("x-auth-token", user.token).send(user.user);
};

module.exports = {
  postUser,
  getMe,
};
