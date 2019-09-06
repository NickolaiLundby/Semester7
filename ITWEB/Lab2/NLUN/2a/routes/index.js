var express = require('express');
var router = express.Router();
const stdControl = require('../controllers/studentController');

/* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});
router.get('/', stdControl.listStudents);


module.exports = router;
