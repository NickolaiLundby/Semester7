'use strict';

// Module dependencies

const mongoose = require('mongoose');
const { wrap: async } = require('co');
const only = require('only');
const Workout = mongoose.model('Workout');

// New workout
exports.new = function(req, res) {
    res.render('workouts/new', {
        title: 'New Workout',
        workout: new Workout()
    });
};

// Create a workout
exports.create = async(function*(req, res){
    const workout = new Workout(only(req.body, 'title'));
    workout.user = req.user;
    try{
        workout.save();
        req.flash('success', 'Successfully created workout!');
        res.redirect(`/workouts/${workout._id}`);
    } catch(err) {
        res.status(422).render('workout/new', {
            title: workout.title || 'New workout',
            errors: [err.toString()],
            workout
        });
    }
});

// Show a workout
exports.show = function(req, res) {
    res.render('workouts/show', {
        title: req.workout.title,
        workout: req.workout
    });
};