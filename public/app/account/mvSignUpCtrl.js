angular.module('app').controller('mvSignupCtrl', function($scope, mvUser, mvAuth, mvNotifier, $location){

	$scope.signup = function(){
		var newUserData = {
			userName: $scope.email, 
			password: $scope.password, 
			firstName: $scope.fname, 
			lastName: $scope.lname
		};
		//mvAuth.log(newUserData);
		mvAuth.createUser(newUserData).then(function(){
			mvNotifier.notify('User account created!');
			$location.path('/');
		}, function(reason){
			mvNotifier.error(reason);
		});
	}

})