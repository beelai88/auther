'use strict';

app.controller('StoryDetailCtrl', function ($scope, story, users, auth) {
	console.log('here is current user', auth.currentUser)
  $scope.story = story;
  $scope.users = users;
  $scope.$watch('story', function () {
    $scope.story.save();
  }, true);

  $scope.isLoggedIn = false; 
  if (auth.currentUser === story.author_id) $scope.isLoggedIn = true; 

  $scope.isAdmin = false; 
  if (auth.isAdmin === true)
    $scope.isAdmin = true; 

});
