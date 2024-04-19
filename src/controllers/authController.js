const { Container } = require("typedi");
const { validateUser } = require("../validation/authValidator");

const postUser = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) throw error;

  const user = await Container.get("authService").validateUser(req.body);
  res.send(user);
};

module.exports = {
  postUser,
};
