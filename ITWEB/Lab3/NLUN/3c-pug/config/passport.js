'use strict';

// Module dependencies

const mongoose = require('mongoose');
const User = mongoose.model('User');

const custom = require('./passport/custom');
// TODO: Add strategies for github and google as well

module.exports = function(passport) {
    passport.serializeUser((user, callback) => 
        callback(null, user.id));
    
    passport.deserializeUser((id, callback) =>
        User.load({ criteria: { _id: id} }, callback));

    // Define which authentication strategies to use.
    passport.use(custom);
};