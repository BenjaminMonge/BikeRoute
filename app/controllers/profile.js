angular.module('BikeRoute')
.controller('ProfileController',
  function($scope, User, $location, $routeParams, $rootScope, Friend, $route) {

    $scope.loadUser = function () {
       User.get({
         username: $routeParams.username
       }, function (response) {
         $scope.user = response.user
         $scope.events = response.user.Events
         $scope.friends = response.friendlist
         $scope.candidates = response.friendwant
       })
     }

     $scope.updateUser = function () {
       delete $scope.user.joinDate
       data = $scope.user

       var fd = new FormData();
        for (var key in data) {
            fd.append(key, data[key]);
        }

        User.update({}, fd).$promise.then(function (res) {
          $scope.user = response.user
          $scope.events = response.events
        })
      }

      $scope.addUser = function () {
        console.log($routeParams.username);
        Friend.save({username: $routeParams.username}, function (response) {
          $route.reload();
        })
      }

      $scope.acceptFriend = function () {
        Friend.update({username: $routeParams.username}, function (response) {
          $route.reload()
        })
      }

      $scope.rejectUser = function () {
        Friend.delete({username: $routeParams.username}, function (response) {
          $route.reload()
        })
      }
  })
