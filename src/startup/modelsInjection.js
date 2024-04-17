const {Container} = require("typedi");

const genreModel = require('../models/genreModel');
const customerModel = require('../models/customerModel');


module.exports = () => {
  Container.set('genreModel', genreModel);
  Container.set('customerModel', customerModel);
}