const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
// morgan middleware logging requests/responses during development
const logger = require('morgan');
// remove cors in production
const cors = require('cors');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const Product = require('./models/product').product;


// require index js
const index = require('./routes/index');

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/sneakers';
mongoose.connect(mongoUri, (err) => {
  if (err) {
    console.log('connection error!');
  }
});

const app = express();

// cross origin reference sharing - remove in production
const corsOptions = {
  origin: 'http://localhost:8080'
};
app.use(cors(corsOptions));

// middleware
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// use index.js for routing
app.use('/', index);

// serve SPA - remove in development
app.use('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
