var express = require('express');
	/*bodyParser = require('body-parser'),
	logger = require('morgan'),
	path = require('path'),*/



var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);

require('./server/config/mongoose')(config);

require('./server/config/passport')();

var routes = require('./server/routes/routes')
app.use('/', routes)

app.listen(config.port, function(err){
	if(err){
		console.log(err);
	}else{
		console.log('Listening on port ' + config.port + '...')
	}
})
