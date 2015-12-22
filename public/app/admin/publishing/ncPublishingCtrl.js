angular.module('app').controller('ncPublishingCtrl', function($scope, $http, $location) {
    $scope.form = {};
    $scope.submitPost = function () {
        $http.post('/api/post', $scope.form).
            success(function (data) {
            	console.log("new pub")
            	console.log(data)
                //$location.path('/');
            });

		
    };
})