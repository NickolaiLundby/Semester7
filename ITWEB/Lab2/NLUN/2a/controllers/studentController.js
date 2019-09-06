'use strict';

let students = [
{
    studentNo : '1',
    firstName: 'Klaus',
    lastName: 'Nielsen'
},
{
    studentNo: '2',
    firstName: 'Niels',
    lastName: 'Jensen'
},
{
    studentNo: '3',
    firstName: 'Anne',
    lastName: 'Hansen'
},
{
    studentNo: '4',
    firstName: 'Jane',
    lastName: 'Troelsen'
}
];

module.exports.listStudents = (req, res) => {
    res.render('listStudents', {
        students
    });
}

module.exports.someStudents = (req, res) => {
    res.render('shortList', {
        title: '3 Students',
        students
    });
}