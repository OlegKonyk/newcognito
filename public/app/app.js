angular.module('app', ['ngResource', 'ngRoute', 'duScroll']);

angular.module('app').config(function($routeProvider, $locationProvider){
	
  var routeRoleChecks = {
		admin:	{ auth: function(mvAuth){
      return mvAuth.authUserForRoute('admin');
		}},
		user:	{ auth: function(mvAuth){
      return mvAuth.authUserForRoute();
		}},
	};

	$locationProvider.html5Mode(true);
	$routeProvider
		.when('/', {templateUrl: '/partials/main/main',
      controller: 'mvMainCtrl',
      shownav: 'fixed'
    })
		.when('/signin', {templateUrl: '/partials/account/signin', 
      css: ['/css/signin/form-elements.css','/css/signin/signin.css'],
			controller: 'ncSigninCtrl',
      shownav: 'show'
		})
    .when('/signup', {templateUrl: '/partials/account/signup', 
      css: ['/css/signin/form-elements.css','/css/signin/signin.css'],
      controller: 'mvSignupCtrl',
      shownav: 'show'
    })
		.when('/admin/users', {templateUrl: '/partials/admin/user-list', 
			controller: 'mvUserListCtrl', resolve: routeRoleChecks.admin,
      shownav: 'show'
		})
		.when('/profile', {templateUrl: '/partials/account/profile', 
			controller: 'mvProfileCtrl', resolve: routeRoleChecks.user,
      shownav: 'show'
		})
		.when('/courses', {templateUrl: '/partials/courses/courses-list', 
			controller: 'mvCourseListCtrl',
      shownav: 'show'
		})
		.when('/courses/:id', {templateUrl: '/partials/courses/course-details', 
			controller: 'mvCourseDetailCtrl',
      shownav: 'show'
		})
    .when('/blog', {templateUrl: '/partials/blog/blog-main',
    css: '/css/blog/blog-home.css', 
      controller: 'ncBlogCtrl',
      shownav: 'show'
    })
    .when('/admin/publishing', {templateUrl: '/partials/admin/publishing/publishing',
      controller: 'ncPublishingCtrl',
      shownav: 'show'
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
          $rootScope.shownav = nextRoute.shownav;
        } else{
          $rootScope.shownav = false;
        }
    });

} )



angular.module('app').directive("scroll", function ($window) {
    return function(scope, element, attrs) {
        angular.element($window).bind("scroll", function() {
             if (this.pageYOffset >= 100) {
                 scope.showTopNav = true;
             } else {
                 scope.showTopNav = false;
             }
            scope.$apply();
        });
    };
});

angular.module('app').directive('ncSmartHead', ['$rootScope','$compile',
    function($rootScope, $compile){
        return {
            restrict: 'A',
            link: function(scope, elem){
                var html = '<link rel="stylesheet" ng-repeat="(routeCtrl, cssUrl) in routeStyles" ng-href="{{cssUrl}}" >';
                elem.append($compile(html)(scope));
                scope.routeStyles = {};
                $rootScope.$on('$routeChangeStart', function (e, next) {
                    if(next && next.$$route && next.$$route.css){
                        scope.routeStyles = {};
                        if(!angular.isArray(next.$$route.css)){
                            next.$$route.css = [next.$$route.css];
                        }
                        angular.forEach(next.$$route.css, function(sheet){
                            scope.routeStyles[sheet] = sheet;
                        });
                    }else{
                      scope.routeStyles = {};
                    }
                });

            }
        };
    }
]);
