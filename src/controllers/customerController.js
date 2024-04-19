const { Container } = require("typedi");
const { validateCustomer } = require("../validation/customerValidator");
const { validateId } = require("../validation/otherValidator");

const getCustomers = async (_, res) => {
  const customers = await Container.get("customerService").getCustomers();
  res.send(customers);
};

const getCustomer = async (req, res) => {
  const customerId = req.params.id;

  // validate cunstomer id
  const { error } = validateId(customerId);
  if (error) throw error;

  const customer = await Container.get("customerService").getCustomer(
    customerId
  );
  res.send(customer);
};

const postCustomer = async (req, res) => {
  // validate customer
  const { error } = validateCustomer(req.body);
  // console.log(req.body);
  if (error) throw error;

  const customer = await Container.get("customerService").addCustomer(req.body);
  res.send(customer);
};

const putCustomer = async (req, res) => {
  // Validation
  const { error } = validateCustomer(req.body);
  if (error) throw error;

  const customerId = req.params.id;
  // validate cunstomer id
  const { error: error2 } = validateId(customerId);
  if (error2) throw error2;

  const customer = await Container.get("customerService").updateCustomer(
    customerId,
    req.body
  );
  res.send(customer);
};

const deleteCustomer = async (req, res) => {
  const customerId = req.params.id;
  // validate cunstomer id
  const { error } = validateId(customerId);
  if (error) throw error;

  const customer = await Container.get("customerService").deleteCustomer(
    customerId
  );
  res.send(customer);
};

module.exports = {
  getCustomers,
  getCustomer,
  postCustomer,
  putCustomer,
  deleteCustomer,
};
