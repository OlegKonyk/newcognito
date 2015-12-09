angular.module('app').factory('mvAuth', function($http, mvIdentity, $q, mvUser){
	
	var postLogInRoute = null;
	
	return {
		authenticateUser: function(username, password){
			var dfd = $q.defer();
			$http.post('/login', {username: username, password: password}).then(function(responce){
		    	if(responce.data.success){
		    		//mvNotifier.notify('You have successfully signed in!');
		    		var user = new mvUser();
		    		angular.extend(user, responce.data.user);
		    		mvIdentity.currentUser = user;
		    		dfd.resolve(true);
		    	}else{
		    		dfd.resolve(false);
		    		//mvNotifier.notify('Username/Password combination incorect')
		    	}
		    });
			return dfd.promise;
		},
		createUser: function(newUserData){
			var newUser = new mvUser(newUserData);
			var dfd = $q.defer();

			newUser.$save().then(function(){
				mvIdentity.currentUser = newUser;
				console.log(mvIdentity.currentUser)
				dfd.resolve();
			}, function(responce){
				console.log(responce.data)
				dfd.reject(responce.data.reason);
			})
			return dfd.promise;
		},
		updateCurrentUser: function(newUserData){
			var dfd = $q.defer();
			console.log('[][][][][][')
			console.log(newUserData)
			var clone = angular.copy(mvIdentity.currentUser);
			angular.extend(clone, newUserData);
			clone.$update().then(function(){
				mvIdentity.currentUser = clone;
				console.log(mvIdentity.currentUser)
				dfd.resolve();
			}, function(responce){
				dfd.reject(responce.data.reason);
			});

			return dfd.promise;
		},
		logoutUser: function(){
			var dfd = $q.defer();
			$http.post('/logout', {logout: true}).then(function(){
		    	mvIdentity.currentUser = undefined;
		    	dfd.resolve();
		    });
			return dfd.promise;
		},
		/*authorizeCurrentUserForRoute: function(role){
			if(mvIdentity.isAuthorized(role)){
				return true;
			} else {
				return $q.reject('not authorized');
			}
		},
		authorizeAuthenticatedUserForRoute: function(){
			if(mvIdentity.isAuthenticated()){
				return true;
			} else {
				return $q.reject('not authorized');
			}
		},*/
		authUserForRoute: function(role){
			if(mvIdentity.isAuthenticated()){
				if(role){
					if(mvIdentity.isAuthorized(role)){
						return true;
					}else{
						return $q.reject('not authorized');
					}
				}
				
			} else {
				return $q.reject('not authenticated');
			}
		},
		setPostLogInRoute : function(route){
			postLogInRoute = route;
		},
		getPostLogInRoute : function(){
			var r = postLogInRoute;
			postLogInRoute = null;
			return r;
		}
	}
});