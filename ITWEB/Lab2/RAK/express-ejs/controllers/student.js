const students = [];

module.exports.student = function (req, res, next) {
    res.render('student', { title: "Add Student" });
    };

module.exports.addStudent = function (req, res, next){
    var student = {
        name: req.body.name,
        grade: req.body.grade
    }

    students.push(student);
};


module.exports.showStudents = function (req, res, next){
    res.render('students', { title: "Students", students });
};