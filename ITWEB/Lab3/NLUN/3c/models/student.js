const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    studentNr: Number,
    firstName: String,
    lastName: String
});

module.exports = mongoose.model('Student', studentSchema);