const { Container } = require("typedi");

const genreController = require('../controllers/genreController')

module.exports = () => {
  Container.set('genreController', genreController);
}