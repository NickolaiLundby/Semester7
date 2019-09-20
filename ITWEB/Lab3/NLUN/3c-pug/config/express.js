const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require('./');

module.exports = function(app){
    // Database
    require('./db');

    // View engine setup
    app.set('views', path.join(__dirname, '../app/views'));
    app.set('view engine', 'pug');

    // Static files
    app.use(express.static(config.root + '/public'));

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
};