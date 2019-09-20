'use strict';

// Module dependencies.

const index = require('../app/controllers/index');
const students = require('../app/controllers/students');

module.exports = function(app) {

    // Expose routes

    app.get('/', index.index);

    // Error handling

    app.use(function(err, req, res, next) {

        // Handle 404

        if (
            err.message &&
            (~err.message.indexOf('not found') ||
            ~err.message.indexOf('Cast to ObjectId failed'))
        ) {
            return next();
        }

        console.error(err.stack);

        if (err.stack.includes('ValidationError')) {
            res.status(422).render('422', { error: err.stack });
            return;
        }

        // Error page
        res.status(500).render('500', { error: err.stack });
    });

    app.use(function(req, res) {
        const payload = {
            url: req.originalUrl,
            error: 'Not found'
        };
        if (req.accepts('json')) return res.status(404).json(payload);
        res.status(404).render('404', payload);
    });
};