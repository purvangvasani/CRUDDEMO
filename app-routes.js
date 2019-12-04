var routes = require('./routes');
var express = require('express');

module.exports = function (app) {
  var apiRoutes = express.Router();

  routes.EventRoutes(apiRoutes);

  app.use('/', apiRoutes);
};
