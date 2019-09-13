var express = require('express');
var router = express.Router();
const ctrlStudent = require('../controllers/student');

/* GET home page. */
router.get('/', ctrlStudent.student);
router.post('/addStudent', ctrlStudent.addStudent);

module.exports = router;