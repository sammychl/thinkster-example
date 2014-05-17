'use strict';

app.controller('AuthCtrl', ['$location', 'Auth', '$scope', 'User', function($location, Auth, $scope, User) {
	if (Auth.signedIn()) {
		$location.path('/');
	}
	$scope.$on('$firebaseSimpleLogin:login', function() {
		$location.path('/');
	});
	$scope.login = function() {
		Auth.login($scope.user).then(function() {
			$location.path('/');
		}, function(error) {
			$scope.error = error.toString();
		});
	};

	$scope.register = function() {
		Auth.register($scope.user).then(function(authUser) {
			console.log(authUser);
			User.create(authUser, $scope.user.username);
			$location.path('/');
		}, function(error) {
			$scope.error = error.toString();
		});
	};

	$scope.fbLogin = function() {
		Auth.fbLogin().then(function(authUser) {

			if (!User.findByUsername(authUser.uid)) {
				console.log(authUser);
				User.create(authUser, authUser.thirdPartyUserData.email);
				$location.path('/');

			} else {
		
				$location.path('/');
			}


		}, function(error) {
			$scope.error = error.toString();
		});
	};
}]);
