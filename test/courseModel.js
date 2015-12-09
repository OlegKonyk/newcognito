var expect = require("chai").expect;
var mongoose = require('mongoose');
var Course = require('../server/models/Course.js')

//Course.createDefaultCourses()

//console.log(Course)
describe('get courses', function(){
	it('should not be empty sinse courses are seeded', function(done){
		mongoose.connect('mongodb://localhost/multivision', function(){


			Course.createDefaultCourses(function(){
				mongoose.model('Course').find({}).exec(function(error, courses){
					expect(courses.length).to.be.at.least(1);
					done();
				})
			})

		})
	})
})