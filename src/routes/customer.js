const { Router } = require('express');
const { Container } = require('typedi');
const router = Router();

module.exports = (app) => {
  app.use('/customers', router);

  const controller = Container.get('customerController');
  
  router.get('/', controller.getCustomers);
  router.post('/', controller.postCustomer);
  router.get('/:id', controller.getCustomer);
  router.put('/:id', controller.putCustomer);
  router.delete('/:id', controller.deleteCustomer);
}