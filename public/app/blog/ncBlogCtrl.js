angular.module('app').controller('ncBlogCtrl', function(ncBlogService, $scope, $http){
	 $scope.allPublications = ncBlogService.query();
	 console.log($scope.allPublications)
   /*$http.get('/api/posts').
      success(function (data, status, headers, config) {
          //$scope.allPublications = data.posts;

          $scope.allPublications = [
          	{}
          ];
      });*/

})