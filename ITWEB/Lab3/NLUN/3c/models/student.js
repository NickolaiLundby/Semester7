const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    studentNr: {
        type: Number,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Student', studentSchema);