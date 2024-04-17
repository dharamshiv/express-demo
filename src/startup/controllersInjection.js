const { Container } = require("typedi");

const genreController = require('../controllers/genreController');
const customerController = require('../controllers/customerController');

module.exports = () => {
  Container.set('genreController', genreController);
  Container.set('customerController', customerController);
}