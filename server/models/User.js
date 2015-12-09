var mongoose = require('mongoose'),
	encrypt = require('../utilities/encription');

var userSchema = mongoose.Schema({
	firstName: {type: String, required: '{PATH} is required!'},
	lastName: {type: String, required: '{PATH} is required!'},
	userName: {
		type: String, 
		required: '{PATH} is required!', 
		unique: true
	}, 
	salt: {type: String, required: '{PATH} is required!'},
	hashed_pwd: {type: String, required: '{PATH} is required!'},
	roles: [String]
});

userSchema.methods = {
	authenticate: function(passwordToMath){
		return encrypt.hashPwd(this.salt, passwordToMath) === this.hashed_pwd;
	},
	hasRole: function(role){
		return this.roles.indexOf(role) > -1;
	}
}

var User = mongoose.model('User', userSchema);

function createDefaultUsers(){

	User.find({}).exec(function(err, colection){

		if(colection.length === 0){
			var salt, hash;
			salt = encrypt.createSalt();
			hash = encrypt.hashPwd(salt, 'joe');
			User.create({firstName: 'Joe', lastName: 'Eames', userName: 'joe@joe.com', salt: salt, hashed_pwd: hash, roles: ['admin']});
			salt = encrypt.createSalt();
			hash = encrypt.hashPwd(salt, 'oleg');
			User.create({firstName: 'Oleg', lastName: 'Konyk', userName: 'oleg@oleg.com', salt: salt, hashed_pwd: hash, roles: []});
			salt = encrypt.createSalt();
			hash = encrypt.hashPwd(salt, 'vasa');
			User.create({firstName: 'Vasa', lastName: 'Petrov', userName: 'vasa@vasa.com', salt: salt, hashed_pwd: hash});
		}

	})
}

exports.createDefaultUsers = createDefaultUsers;