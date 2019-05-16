var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//contain code for handling particular sets of related "routes" 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//Import routes for "catalog" area of site
var catalogRouter = require('./routes/catalog');

//create the app object using our imported express module
var app = express();

//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://dkolodziej:dKolo77ii@cluster0-d04oq.mongodb.net/local_library?retryWrites=true';
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
// creates the default connection to the database and binds to the error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
//set the 'views' value to specify the folder where the templates will be stored
app.set('views', path.join(__dirname, 'views'));
//set the 'view engine' value to specify the template library
app.set('view engine', 'pug');


//call app.use() to add the middleware libraries into the request handling chain
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//get Express to serve all the static files in the /public directory 
app.use(express.static(path.join(__dirname, 'public')));

//add our (previously imported) route-handling code to the request handling chain
app.use('/', indexRouter);
app.use('/users', usersRouter);
// Add catalog routes to middleware chain.
app.use('/catalog', catalogRouter);  


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
