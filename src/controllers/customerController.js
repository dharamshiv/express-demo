const { Container } = require("typedi");
const { VALIDATION_ERROR } = require("../constants/errorCodes");
const ValidationError = require("../util/validationError");
const { validateCustomer } = require("../validation/customerValidators");
const {
  validateId,
  validateIdUsingMongoose,
} = require("../validation/otherValidatior");

const getCustomers = async (_, res) => {
  const customers = await Container.get("customerService").getCustomers();
  res.send(customers);
};

const getCustomer = async (req, res) => {
  const customerId = req.params.id;

  // validate cunstomer id
  const { error } = validateId(customerId);
  if (error) {
    throw new ValidationError(VALIDATION_ERROR, 400, error.details[0].message);
  }

  const customer = await Container.get("customerService").getCustomer(
    customerId
  );
  res.send(customer);
};

const postCustomer = async (req, res) => {
  // validate customer
  const { error } = validateCustomer(req.body);
  if (error) {
    throw new ValidationError(VALIDATION_ERROR, 400, error.details[0].message);
  }

  const customer = await Container.get("customerService").addCustomer(
    req.body.name
  );
  res.send(customer);
};

const putCustomer = async (req, res) => {
  // Validation
  const { error } = validateCustomer(req.body);
  if (error) {
    throw new ValidationError(VALIDATION_ERROR, 400, error.details[0].message);
  }
  const customerId = req.params.id;

  // validate cunstomer id
  const { error: error2 } = validateId(customerId);
  if (error2) {
    throw new ValidationError(VALIDATION_ERROR, 400, error2.details[0].message);
  }

  const customer = await Container.get("customerService").updateGenre(
    customerId,
    req.body.name
  );
  res.send(customer);
};

const deleteCustomer = async (req, res) => {
  const customerId = req.params.id;
  const isValid = validateIdUsingMongoose(customerId);
  if (!isValid) {
    throw new ValidationError(VALIDATION_ERROR, 400, "invalid id");
  }
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
