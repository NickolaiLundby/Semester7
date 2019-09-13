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
    res.render('listStudents', {
        title: 'Student list',
        students
    });
}