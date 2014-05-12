/* global app:true */
'use strict';

var app = angular.module('angNewsApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'firebase'
])
    .constant('FIREBASE_URL', 'https://scorching-fire-3130.firebaseio.com/');

app.config(function ($routeProvider) {
    $routeProvider
	.when('/', {
            templateUrl: 'views/posts.html',
	    controller: 'PostsCtrl'
	})
	.when('/posts/:postId', {
            templateUrl: 'views/showpost.html',
            controller: 'PostViewCtrl'
	})
	.when('/register',{
	    templateUrl: 'views/register.html',
	    controller: 'AuthCtrl'
	})
	.when('/login', {
	    templateUrl: 'views/login.html',
	    controller: 'AuthCtrl'
	})
	.otherwise({
            redirectTo: '/'
	});
});

