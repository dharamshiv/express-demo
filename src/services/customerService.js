const { Container } = require("typedi");
const { AppError } = require("../util/error");
const { INVALID_CUSTOMER } = require("../constants/errorCodes");

getCustomers = async () => {
  const customerModel = Container.get("customerModel");
  return await customerModel.find();
};

getCustomer = async (id) => {
  const customerModel = Container.get("customerModel");
  const customer = await customerModel.findById(id);
  if (!customer) {
    throw new AppError(
      INVALID_CUSTOMER,
      404,
      "The customer with givem id was not found"
    );
  }
  return customer;
};

addCustomer = async (item) => {
  const customerModel = Container.get("customerModel");
  let customer = new customerModel({
    name: item.name,
    isGold: item.isGold,
    phone: item.phone,
  });
  customer = await customer.save();
  return customer;
};

updateCustomer = async (id, item) => {
  console.log(id, item);
  const customerModel = Container.get("customerModel");
  const customer = await customerModel.findByIdAndUpdate(
    id,
    {
      name: item.name,
      isGold: item.isGold,
      phone: item.phone,
    },
    { new: true }
  );
  if (!customer) {
    throw new AppError(
      INVALID_CUSTOMER,
      404,
      "The customer with givem id was not found"
    );
  }
  return customer;
};

deleteCustomer = async (id) => {
  const customerModel = Container.get("customerModel");
  const customer = await customerModel.findByIdAndDelete(id);
  if (!customer) {
    throw new AppError(
      INVALID_CUSTOMER,
      404,
      "The customer with givem id was not found"
    );
  }
  return customer;
};

module.exports = {
  getCustomers,
  getCustomer,
  addCustomer,
  updateCustomer,
  deleteCustomer,
};
