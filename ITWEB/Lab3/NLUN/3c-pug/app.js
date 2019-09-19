const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require('./config');

const app = express();

module.exports = app;

// Bootstrap routes
require('./config/express')(app);
require('./config/routes')(app);