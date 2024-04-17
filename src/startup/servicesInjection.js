const {Container} = require("typedi");

const genreService = require('../services/genereService');
const customerService = require('../services/customerService');


module.exports = () => {
  Container.set('genreService', genreService);
  Container.set('customerService', customerService);
}