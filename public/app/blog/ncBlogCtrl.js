angular.module('app').controller('ncBlogCtrl', function($scope, $http){
   $http.get('/api/posts').
      success(function (data, status, headers, config) {
          $scope.allPublications = data.posts;
      });

})