'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.unimplemented = function(req, res){
    req.flash('info', 'Feature still under construction');
    res.render('/users/signup', {
        title: 'Sign up',
        user: new User()
    });
};