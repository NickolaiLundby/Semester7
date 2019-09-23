var express = require('express');
var router = express.Router();
const ctrlStudent = require('../controllers/student');

/* GET home page. */
router.get('/', ctrlStudent.showStudents);

module.exports = router;