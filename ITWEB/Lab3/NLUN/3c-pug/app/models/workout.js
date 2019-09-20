'use strict';

// Module dependencies

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    title: { type: String, default: '', maxlength: 400 },
    user: { type: Schema.ObjectId, ref: 'User' },
    excercises: [
        {
            name: { type: String, default: '', maxlength: 100 },
            description: { type: String, default: '', maxlength: 400 },
            sets: { type: Number, require: true },
            repetitions: { type: Number, require: true }
        }
    ]
});

// Validation
WorkoutSchema.path('title').required(true, 'Workout title invalid');

// Methods
WorkoutSchema.methods = {
    // Add excercise to workout
    addExcercise: function(user, excercise){
        this.excercises.push({
            name: excercise.name,
            description: excercise.description,
            sets: excercise.sets,
            repetitions: excercise.repetitions
        });

        return this.save();
    }
};

mongoose.model('Workout', WorkoutSchema);