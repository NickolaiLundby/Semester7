'use strict';

// Module dependencies
const mongoose = require('mongoose');

// Mongoose models


exports.index = function(req, res) {
    res.render('index', {title: 'PUG' });
}