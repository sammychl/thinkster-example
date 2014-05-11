'use strict';

app.controller('PostViewCtrl', ['$scope', '$routeParams', 'Post', function($scope, $routeParams, Post) {
    $scope.post = Post.find($routeParams.postId);
}]);
