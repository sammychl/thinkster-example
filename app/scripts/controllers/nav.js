'use strict';

app.controller('NavCtrl', ['$scope', '$location', 'Post', 'Auth', function ($scope, $location, Post, Auth) {
	$scope.post = {url: 'http://', title: '', description: ''};
	
	$scope.submitPost = function () {
		Post.create($scope.post).then(function (postId) {
			$scope.post = {url: 'http://', title: '', description:''};
			$location.path('/posts/' + postId);
		});
	};
	
	$scope.logout = function() {
		Auth.logout();
	};
	
}]);
