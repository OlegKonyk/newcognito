var express = require('express'),
	stylus = require('stylus'),
	path = require('path'),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser')
	session = require('express-session'),
	passport = require('passport');

//var routes = require('../routes/routes')

module.exports = function(app, config){

	function compile(str, path) {
	  return stylus(str).set('filename', path);
	}

	app.set('views', path.join(config.rootPath, 'server/views'));
	app.set('view engine', 'jade');
	app.use(logger('dev'));

	app.use(cookieParser());
	app.use(bodyParser.json()); // for parsing application/json
	app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

	app.use(session({secret: 'multivision unicorns', resave: false, saveUninitialized: false}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(stylus.middleware(
			{
				src: config.rootPath + '/public',
				compile: compile
			}
		));
	app.use(express.static(path.join(config.rootPath, 'public')));

	

	//app.use('/', routes)
}