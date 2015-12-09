angular.module('app').controller('mvCourseDetailCtrl', function($scope, mvCachedCourses, $routeParams){
	mvCachedCourses.query().$promise.then(function(colection){
		colection.forEach(function(course){
			if(course._id === $routeParams.id){
				$scope.course = course;
			}
		})
	})
});