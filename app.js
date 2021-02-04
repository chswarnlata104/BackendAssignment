const express = require('express');
const morgan = require('morgan');

const webServerRoutes = require('./routes/webServerRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/', webServerRoutes);

module.exports = app;
