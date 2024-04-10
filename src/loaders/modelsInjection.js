const {Container} = require("typedi");

const genreModel = require('../models/genreModel')


module.exports = () => {
  Container.set('genreModel', genreModel);
}