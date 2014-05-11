'use strict';

// app.controller('NavCtrl', ['$scope', '$location', 'Post', function($scope, $location, Post) {
//     $scope.post = {url: 'http://', title: ''};
//     $scope.submitPost = function() {
// 	Post.create($scope.post).then(function(ref) {
// 	    $location.path('/posts/' + ref.name());
// 	    $scope.post = {url: 'http://', title: ''}
// 	})
//     }
// }])



 
app.controller('NavCtrl', ['$scope', '$location', 'Post', function ($scope, $location, Post) {
    $scope.post = {url: 'http://', title: 'put title here'};
 
    $scope.submitPost = function () {
      Post.create($scope.post).then(function (ref) {
          $location.path('/posts/' + ref.name());
          $scope.post = {url: 'http://', title: ''};
      });
    };
 
}]);
