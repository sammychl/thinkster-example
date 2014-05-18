'use strict';

app.controller('PostsCtrl', function ($scope, Post, $location, User) {
	if ($location.path() ==='/') {
		$scope.posts = Post.all;
	} 
	
	$scope.post = {url: 'http://', 'title': '', description:''};
	
	$scope.deletePost = function (postId) {
		Post.delete(postId);
	};

	$scope.upVotePost = function(postId, upVoted) {
		if (upVoted) {
			Post.clearVote(postId, upVoted);
		} else {
			Post.upVote(postId);
		}
	};
	
	$scope.downVotePost = function(postId, downVoted) {
		if (downVoted) {
			Post.clearVote(postId, !downVoted);
		} else {
			Post.downVote(postId);
		}
	};

	$scope.upVoted = function(post) {
		return Post.upVoted(post);
	};

	$scope.downVoted = function(post) {
		return Post.downVoted(post);
	};

	/********************
	 **subscribe section**
	 ********************/

	$scope.subscribe = function(postId, subscribed) {
		if (!subscribed) {
			Post.subscribe(postId);
		}
	};

	$scope.unsubscribe = function(postId, subscribed) {
		if (subscribed) {
			Post.unsubscribe(postId);
		}
	};

	$scope.subscribed = function(postId) {
		return Post.subscribed(postId);
	};
	
});
