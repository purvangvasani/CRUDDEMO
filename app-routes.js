var routes = require('./routes');
var express = require('express');

module.exports = function (app) {
  var apiRoutes = express.Router();

  routes.PokemonRoutes(apiRoutes);

  app.use('/', apiRoutes);
};
