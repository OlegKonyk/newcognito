angular.module('app', ['ngResource', 'ngRoute']);//, 'duScroll'



angular.module('app').config(function($routeProvider, $locationProvider){
	var routeRoleChecks = {
		admin:	{ auth: function(mvAuth){
					//return mvAuth.authorizeCurrentUserForRoute('admin');
                    return mvAuth.authUserForRoute('admin');
			}},
		user:	{ auth: function(mvAuth){
					//return mvAuth.authorizeAuthenticatedUserForRoute();
                    return mvAuth.authUserForRoute();
			}},
	}
	$locationProvider.html5Mode(true);
	$routeProvider
		.when('/', {templateUrl: '/partials/main/main', controller: 'mvMainCtrl'}) //'mvMainCtrl'
		.when('/signin', {templateUrl: '/partials/account/signin', 
			controller: 'ncSigninCtrl'
		})
		.when('/admin/users', {templateUrl: '/partials/admin/user-list', 
			controller: 'mvUserListCtrl', resolve: routeRoleChecks.admin 
		})
		.when('/signup', {templateUrl: '/partials/account/signup', 
			controller: 'mvSignupCtrl' 
		})
		.when('/profile', {templateUrl: '/partials/account/profile', 
			controller: 'mvProfileCtrl', resolve: routeRoleChecks.user
		})
		.when('/courses', {templateUrl: '/partials/courses/courses-list', 
			controller: 'mvCourseListCtrl'
		})
		.when('/courses/:id', {templateUrl: '/partials/courses/course-details', 
			controller: 'mvCourseDetailCtrl'
		})

});


angular.module('app').run(function($rootScope, $location, mvAuth, mvNotifier){
	$rootScope.postLogInRoute = null;
    $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection){
		if(rejection === 'not authorized'){
            mvNotifier.notify('Not authorized! Redirecting to home page.');
			$location.path('/');
		}
        if(rejection === 'not authenticated'){
            mvNotifier.notify('Not authenticated! Please sign in first.');
            mvAuth.setPostLogInRoute($location.path())
            $location.path('/signin');
        }
        /*if(rejection === 'not authenticated'){
            console.log("z::::z")
            //console.log(current.$$route.originalPath)
            $rootScope.postLogInRoute = $location.path();
            //mvAuth.setPostLogInRoute
            console.log("init route")
            console.log($rootScope.postLogInRoute)
            $location.path('/signin');
        }*/
	})

} )

/*angular.module('app').controller('MyCtrl', function($scope, $document){
    $scope.toTheTop = function() {
      $document.scrollTopAnimated(0, 5000).then(function() {
        console && console.log('You just scrolled to the top!');
      });
    }
    var section3 = angular.element(document.getElementById('section-3'));
    $scope.toSection3 = function() {
      $document.scrollToElementAnimated(section3);
    }
  }
).value('duScrollOffset', 0);*/
