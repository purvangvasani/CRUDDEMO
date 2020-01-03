var createError = require('http-errors');
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const appRoutes = require('./app-routes');
const helmet = require('helmet');
const compression = require('compression');

//Declarations
const app = express();

// Compression
app.use(compression());

// Helmet
app.use(helmet());

const corsOptions = {
  exposedHeaders: ['x-filename', 'x-mimetype'],
  origin: function (origin, callback) {
    callback(null, true);
  }
};
app.use(cors(corsOptions));

app.use(morgan('dev')); // Morgan Middleware
app.use(bodyParser.json({ extended: true, limit: '50mb' })); // Body-parser middleware
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' })); // For parsing application/x-www-form-urlencoded

appRoutes(app);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/files')));

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

server = http.createServer(app);

server.listen(3000, () => {
  console.log('Connected to node app server @ port 3000.');
});

module.exports = app;

