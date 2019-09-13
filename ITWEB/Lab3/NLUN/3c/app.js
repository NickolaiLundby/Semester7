var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const layout = require('express-ejs-layouts');
const db = require('./models/db');
var bodyParser = require('body-parser');

// routing
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var listStudentRouter = require('./routes/listStudents');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(layout);

// routing
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/listStudents', listStudentRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// saving to database
app.post('/', function(req, res) {
  var student = new Student(req.body);
  student.save()
  .then(item => {
    res.send('Item saved to database');
  })
  .catch(err => {
    res.status(400).send("Unable to save to database");
  });
});

module.exports = app;
