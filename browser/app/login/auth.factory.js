app.factory('auth', function($http, $state){
	var auth = {};

	auth.currentUser; 

	auth.submitLogin = function(email, password){

		return $http.post('/login', {email: email, password: password})
		.then(function(user){
			console.log(user);
			auth.currentUser = user.data.id; 
			auth.isAdmin = user.data.isAdmin
			$state.go('stories');
		})
		.then(null, function(error){
			console.log("error?", error);
		})
	}

	auth.submitSignup = function(email, password){

		return Promise.all([$http.post('/api/users', {email: email, password: password}), $http.post('/login', {email: email, password: password})])
		.then(function(result){
			var user = result[1];
			auth.currentUser = user.data.id; 
			auth.isAdmin = user.data.isAdmin;
			$state.go('stories');
		})
		.then(null, function(error){
			console.log("error?", error);
		})
	}

	return auth;

})