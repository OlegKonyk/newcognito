var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');


module.exports = {
	development:{
		db: 'mongodb://localhost/multivision',
		rootPath: rootPath,
		port: process.env.PORT || 3030
	},
	production: {
		db: 'mongodb://admin:123@ds029814.mongolab.com:29814/multivision',
		rootPath: rootPath,
		port: process.env.PORT || 80
	}
}