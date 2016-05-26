app.controller('loginCtrl', function($location, $scope, auth, $http){

	// console.log('here is location', $location)
	auth.currentUser = $scope.currentUser; 

	$scope.submit = function (option) {
		if (option === 'login') {
			console.log("you are trying to login")
			auth.submitLogin($scope.user.email, $scope.user.password);

		} 
		if (option === 'signup') {
			console.log('you are trying to signup')
			auth.submitSignup($scope.user.email, $scope.user.password);
		}	
	}

	$scope.googleLogin = function () {
		return $http.get('/auth/google')
		.then(function(thing) {
			console.log('what is this', thing)
		})
		.then(null, function(err){
			console.log("ERROR", err);
		})
	}

})