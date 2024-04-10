const {Container} = require("typedi");

const genreService = require('../services/genereService')


module.exports = () => {
  Container.set('genreService', genreService);
}