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
//exports.create = async(function*(req, res){
//    const workout = new Workout(only)
//};