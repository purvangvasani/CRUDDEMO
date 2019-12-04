var createError = require('http-errors');
const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const appRoutes = require('./app-routes');
const bodyParser = require('body-parser');

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(morgan('dev'));

app.use(bodyParser.json({
  extended: true,
  limit: '50mb'
}));

app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb'
}));

appRoutes(app);

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use(function (req, res, next) {
  next(createError(404));
});

//initialize connection to database
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.connect(
  "mongodb://post:post123@ds251618.mlab.com:51618/assignment",
  { keepAlive: true, useNewUrlParser: true, useCreateIndex: true }, async (err, db) => {
    if (err) {
      console.log(err);
    }
  });

//on database connection
mongoose.connection
  .on('open', async () => { console.log('Connection open to database instance.'); })
  .on('error', error => console.log('Error connecting to MongoLab: ', error))
  .on('connected', () => { console.log('Connected to Customer database instance.'); });

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

var server;
server = http.createServer(app);

server.listen(3000, () => {
  console.log('Connected to node app server @ port 3000.');
});

module.exports = app;
