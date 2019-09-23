const express = require('express');
const router = express.Router();
const controller = require('../controllers/student');

router.get('/', controller.listStudents);

module.exports = router;