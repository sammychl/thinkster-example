'use strict';
 
app.controller('NavCtrl', ['$scope', '$location', 'Post', 'Auth', function ($scope, $location, Post, Auth) {
    $scope.post = {url: 'http://', title: 'put title here'};
 
    $scope.submitPost = function () {
      Post.create($scope.post).then(function (ref) {
          $location.path('/posts/' + ref.name());
          $scope.post = {url: 'http://', title: ''};
      });
    };
 
    $scope.logout = function() {
	Auth.logout();
    }
    
}]);
