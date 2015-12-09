angular.module('app').controller('ncSigninCtrl', function($rootScope, $scope, $http, mvIdentity, mvNotifier, mvAuth, $location){

	$scope.identity = mvIdentity;
    
    $scope.signin = function(username, password){

	    mvAuth.authenticateUser(username, password).then(function(success){
	    	if(success){
	    		var postLogInRoute = mvAuth.getPostLogInRoute()
	    		if (postLogInRoute){
	    			$location.path(postLogInRoute);
	    		}else{
	    			$location.path('/');
	    		}
	    		mvNotifier.notify('You have successfully signed in!');
	    	}else{
	    		mvNotifier.notify('Username/Password combination incorect')
	    	}
	    })
	    console.log(username, password)
	   
	};

	$scope.signout = function(){
		mvAuth.logoutUser().then(function(){
			$scope.username = "";
			$scope.password = "";
			mvNotifier.notify('You have successfully signed out!')
			$location.path('/');
		})
	}

})