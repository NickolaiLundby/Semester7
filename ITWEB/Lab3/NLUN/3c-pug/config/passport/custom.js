'use strict';

// Module dependencies

const mongoose = require('mongoose');
const Custom = require('passport-local').Strategy;
const User = mongoose.model('User');

// Authentication through username (email) and password. Through the
// passport-local module.
// http://www.passportjs.org/docs/username-password/

module.exports = new Custom({
    usernameField: 'email',
    passwordField: 'password'
},
function(email,password, done) {
    const options = {
        criteria: { email: email },
        select: 'name username email encryptedpassword'
    };
    User.load(options, function(err, user) {
        if (err) return done(err);
        if (!user) {
            return done(null, false, { message: 'Invalid user' });
        }
        if (!user.authenticate(password)) {
            return done(null, false, { message: 'Invalid password' });
        }
        return done(null, user);
    })
});