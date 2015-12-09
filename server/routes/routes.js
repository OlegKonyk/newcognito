var express = require('express'),
	router = express.Router(),
	auth = require('../config/auth'),
	users = require('../controllers/users'),
	courses = require('../controllers/courses'),
	mongoose = require('mongoose'),
	User = mongoose.model('User');

router.get('/api/users', auth.requiresRole('admin'), users.getUsers);

router.post('/api/users', users.createUser);
router.put('/api/users', users.updateUser);

router.get('/api/courses', courses.getCourses);
router.get('/api/courses/:id', courses.getCourseById);

router.get('/partials/*', function(req, res){
	res.render('../../public/app/' + req.params[0]);
});

router.post('/login', auth.authenticate);

router.post('/logout', function(req, res){
	req.logout();
	res.end();
});

router.all('/api/*', function(req, res){
	res.send(404);
})

router.get('*', function(req, res){
	res.render('index', {
		bootstrappedUser: req.user
	});
});

module.exports = router;