'use strict';

// Module dependencies

const mongoose = require('mongoose');
const User = mongoose.model('User');
const { wrap: async } = require('co');

// Create user
exports.create = async(function*(req, res){
    const user = new User(req.body);
    user.provider = 'local';
    try{
        user.save();
        req.login(user, err => {
            if (err) req.flash('info', 'Something went wrong when logging in!');
            res.redirect('/');
        });
    } catch (err) {
        console.log(err);

        res.render('/users/signup', {
            title: 'Sign up',
            user: user
        });
    }
});

// Load user by _id from database
exports.load = async(function*(req, res) {
    const index = { _id };
    try {
        req.profile = yield User.load({ index });
        if (!req.profile) return next(new Error('User does not exist'));
    } catch(err) {
        return next(err);
    }
    next();
});

// Show sign up to user
exports.signup = function(req, res) {
    res.render('users/signup', {
        title: 'Sign up form',
        user: new User()
    });
};

// Show login to user
exports.login = function(req, res) {
    res.render('users/login', {
        title: 'Login'
    });
};

// Logout user
exports.logout = function(req, res) {
    req.logout();
    res.redirect('/login');
};

// Show user
exports.show = function(req, res) {
    const user = req.profile;
    res.render('users/show', {
        title: user.name,
        user: user
    });
};

// Login the user
exports.session = function(req, res) {
    const redirectUrl = req.session.returnTo ? req.session.returnTo : '/';
    delete req.session.redirectUrl;
    res.redirect(redirectUrl)
};

// Callback
exports.authenticationcallback = function(req, res) {
    const redirectUrl = req.session.returnTo ? req.session.returnTo : '/';
    delete req.session.redirectUrl;
    res.redirect(redirectUrl)
};