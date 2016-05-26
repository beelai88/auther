'use strict';

app.controller('UserDetailCtrl', function ($scope, user, Story, auth, $state) {
  $scope.user = user;
  $scope.newStory = new Story({author_id: $scope.user.id});
  $scope.addStory = function () {
    $scope.newStory.save()
    .then(function (story) {
      $scope.newStory = new Story({author_id: $scope.user.id});
      $scope.user.stories.unshift(story);
    });
  };
  $scope.removeStory = function (story) {
    story.destroy()
    .then(function () {
      var idx = $scope.user.stories.indexOf(story);
      $scope.user.stories.splice(idx, 1);
    });
  };
  $scope.gotoUserList = function () {
    $state.go('users');
  };

  $scope.isLoggedIn = false;

  if (auth.currentUser === user.id) 
      $scope.isLoggedIn = true; 


  $scope.isAdmin = false; 
  if (auth.isAdmin === true)
    $scope.isAdmin = true; 

});

