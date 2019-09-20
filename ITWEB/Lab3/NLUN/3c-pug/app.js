const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const join = require('path').join;
const passport = require('passport');
const fs = require('fs');

// Require all mongoose models
const models = join(__dirname, 'app/models');
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^.].*\.js$/))
  .forEach(file => require(join(models, file)));

const app = express();

module.exports = app;

// Routing
require('./config/passport')(passport);
require('./config/express')(app, passport);
require('./config/routes')(app, passport);