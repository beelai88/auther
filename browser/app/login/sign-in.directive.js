app.directive('signIn', function(){
	return {
		restrict: 'E',
		scope:{
			option: '='
		},
		templateUrl: '/browser/app/login/sign-in.template.html', 
		controller: 'loginCtrl'
	}
})