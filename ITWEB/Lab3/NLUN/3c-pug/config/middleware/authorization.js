'use strict';

// https://stackoverflow.com/questions/13335881/redirecting-to-previous-page-after-authentication-in-node-js-using-passport-js

exports.loginRequired = function(req, res, next) {
    if (req.isAuthenticated()) return next();
    if (req.method == 'GET') req.session.returnTo = req.originalUrl;
    res.redirect('/users/login');
};