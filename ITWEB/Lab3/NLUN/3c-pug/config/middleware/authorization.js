'use strict';

exports.loginRequired = function(req, res, next) {
    if (req.isAuthenticated()) return next();
    if (req.method == 'GET') req.session.returnTo = req.originalUrl;
    res.redirect('/users/login');
};