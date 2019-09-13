const StudentModel = require('../models/student');
'use strict';

let students = [
    StudentModel
    .find({})
    .then(doc => {
        console.log(doc)
    })
    .catch(err => {
        console.error(err)
    })
];

module.exports.listStudents = (req, res) => {
    res.render('students', {
        title: 'Student list',
        students
    });
}

module.exports.addStudent = function (req, res, next) {
    var student = new StudentModel(req.body);
    student.save()
        .catch(err => {
        res.status(400).send("Unable to save to database");
    });
}