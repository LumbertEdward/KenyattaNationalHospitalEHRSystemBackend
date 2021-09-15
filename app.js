var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var multer = require('multer');

var usersRouter = require('./routes/users');
var patientsRouter = require('./routes/patientsroutes');
var staffroutes = require('./routes/staffroutes');
var appointmentsroutes = require('./routes/appointmentsroutes');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public/images/', express.static('./public/images'));
app.use(cors());
app.use(logger('dev'));

app.use('/', usersRouter);
app.use('/KNH/patient', patientsRouter);
app.use('/KNH/staff', staffroutes);
app.use('/KNH/appointments', appointmentsroutes);

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

module.exports = app;
