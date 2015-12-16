angular.module('app', ['ngResource', 'ngRoute', 'duScroll']);//, 'duScroll'



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
			controller: 'ncSigninCtrl',
      shownav: true
		})
    .when('/signup', {templateUrl: '/partials/account/signup', 
      controller: 'mvSignupCtrl',
      shownav: true
    })
		.when('/admin/users', {templateUrl: '/partials/admin/user-list', 
			controller: 'mvUserListCtrl', resolve: routeRoleChecks.admin 
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
	})

  $rootScope.$on('$routeChangeStart', function (event, nextRoute, currentRoute) {

        if (nextRoute.shownav) {
          $rootScope.shownav = true;
        } else{
          $rootScope.shownav = false;
        }
    });

} )



angular.module('app').directive("scroll", function ($window) {
    return function(scope, element, attrs) {
        angular.element($window).bind("scroll", function() {
             if (this.pageYOffset >= 100) {
             	console.log("****")
                 scope.showTopNav = true;
             } else {
                 scope.showTopNav = false;
             }
            scope.$apply();
        });
    };
});

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
