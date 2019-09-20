'use strict';

// Module dependencies.

const index = require('../app/controllers/index');
const auth = require('../app/controllers/auth');
const users = require('../app/controllers/users');
const workouts = require('../app/controllers/workouts');
const authorization = require('./middleware/authorization');

module.exports = function(app, passport) {
    // Bind passport for authentication
    const pauth = passport.authenticate.bind(passport);

    // Expose routes
    app.get('/', index.index);

    // Extern auth routes
    app.get('/auth/github', auth.unimplemented);
    app.get('/auth/google', auth.unimplemented);

    // Public routes
    app.get('/users/login', users.login);
    app.get('/users/signup', users.signup);
    app.post('/users/create', users.create);
    app.post('/users/session', pauth('local', {
        failureRedirect: '/login',
        failureFlash: 'Invalid credentials'
        }),
        users.session
    );

    // Routes required authorization
    app.get('/workouts/new', authorization.loginRequired, workouts.new);
    app.get('/workouts/:id', authorization.loginRequired, workouts.show);
    app.post('/workouts', authorization.loginRequired, workouts.create);

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