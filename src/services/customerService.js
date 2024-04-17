const { Container } = require("typedi");
const AppError = require("../util/appError");
const { INVALID_CUSTOMER } = require("../constants/errorCodes");

getCustomers = async () => {
  const customerModel = Container.get('customerModel');
  return await customerModel.find();
};

getCustomer = async (id) => {
  const customerModel = Container.get('customerModel');
  const customer = await customerModel.findById(id);
  if (!customer) {
    throw new AppError(
      INVALID_CUSTOMER,
      "The customer with givem id was not found",
      404
    );
  }
  return customer;
};

addCustomer = async (name) => {
  const customerModel = Container.get('customerModel');
  let customer = new customerModel({name});
  customer = await customer.save({name})
  return customer;
};

updateCustomer = async (id, name) => {
  const customerModel = Container.get('customerModel');
  const customer = await customerModel.findByIdAndUpdate(id, {name: name}, {new: true} );
  if (!customer) {
    throw new AppError(
      INVALID_CUSTOMER,
      "The customer with givem id was not found",
      404
    );
  }
  return customer;
};

deleteCustomer = async (id) => {
  const customerModel = Container.get('customerModel');
  const customer = await customerModel.findByIdAndDelete(id);
  if (!customer) {
    throw new AppError(
      INVALID_CUSTOMER,
      "The customer with givem id was not found",
      404
    );
  }
  return customer;
};

module.exports = {
  getCustomers,
  getCustomer,
  addCustomer,
  updateCustomer,
  deleteCustomer
}
