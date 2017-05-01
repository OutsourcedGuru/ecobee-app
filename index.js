/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , login = require('./routes/login')
  , thermostats = require('./routes/thermostats')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('ecobee-app'));	// using signed cookies to store the refresh token
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// Define all of the applicaiton endpoints for get and post
app.get('/', routes.index);

// check routes/login.js for the implementation details of the login routes
app.get('/login', login.list);			// login page
app.get('/login/getpin', login.getpin);		// login page
app.get('/login/error', login.error);		// error page
app.post('/login', login.create);		// login post handler

// check routes/thermostats.js for the implementation details of the thermostat routes
app.post('/thermostats/:id/sethold', thermostats.hold);		// adjust a specific thermostat hold
app.post('/thermostats/:id/resume', thermostats.resume);	// resume a specific thermostat
app.post('/thermostats/:id/mode', thermostats.mode);		// change the mode of a specific thermostats
app.get('/thermostats/:id', thermostats.view);			// view a specific thermostat
app.get('/thermostats', thermostats.list);			// list all the users thermostats

http.createServer(app).listen(app.get('port'), function(){
  console.log("Application server listening on port " + app.get('port'));
});
