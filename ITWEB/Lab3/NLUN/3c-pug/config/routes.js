'use strict';

// Module dependencies.

const index = require('../app/controllers/index');
const students = require('../app/controllers/students');

// Expose and binds routes

module.exports = function(app) {
    app.use('/', index)
}