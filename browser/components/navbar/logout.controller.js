app.controller('logoutCtrl', function($scope, $http){
	$scope.logout = function () {
		console.log("logging out?");
		$http.post('/logout')
			.then(function(){
				console.log("here?")
			})
			.then(null, function(error){
				console.log(error);
			})
	}
})