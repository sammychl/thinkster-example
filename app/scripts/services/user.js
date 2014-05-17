'use strict';

app.factory('User', ['$firebase', 'FIREBASE_URL', 'Auth', '$rootScope', function($firebase, FIREBASE_URL, Auth, $rootScope) {
	var ref = new Firebase(FIREBASE_URL + 'users');

	var users = $firebase(ref);

	var User = {
		create: function (authUser, username) {
			users[username] = {
				md5_hash: authUser.md5_hash,
				displayName: username,
				username: username,
				$priority: authUser.uid
			};

			users.$save(username).then(function() {
				setCurrentUser(username);
			});
		},
		createFbUser: function (authUser, username) {
			users[username] = {
				md5_hash: authUser.thirdPartyUserData.email,
				displayName: authUser.displayName + " (facebook)",
				username: username,
				$priority: authUser.uid
			};

			users.$save(username).then(function() {
				setCurrentUser(username);
			});
		},
		findByUsername: function (username) {
			if(username) {
				return users.$child(username);
			}
		},
		getCurrent: function() {
			return $rootScope.currentUser;
		},
		signedIn: function() {
			return $rootScope.currentUser !== undefined;
		}
	};


	function setCurrentUser (username) {
		console.log(username);
		$rootScope.currentUser = User.findByUsername(username);
	}
	
	$rootScope.$on('$firebaseSimpleLogin:login', function(e, authUser) {
		var query = $firebase(ref.startAt(authUser.uid).endAt(authUser.uid));
		console.log(authUser);
		query.$on('loaded', function() {
			console.log(query.$getIndex()[0]);
			if (typeof query.$getIndex()[0] == 'undefined') {
				console.log(authUser.displayName);
				User.createFbUser(authUser, authUser.uid);
				var reQuery = $firebase(ref.startAt(authUser.uid).endAt(authUser.uid));
				reQuery.$on('loaded', function() {
					setCurrentUser(reQuery.$getIndex()[0]);
				});
			} else {
			setCurrentUser(query.$getIndex()[0]);
			}
		});
	});

	$rootScope.$on('$firebaseSimpleLogin:logout', function() {
		delete $rootScope.currentUser;
	});

	return User;
}]);
