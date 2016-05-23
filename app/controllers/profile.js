angular.module('BikeRoute')
.controller('ProfileController',
  function($scope, Udata, $location, $routeParams) {

      $scope.loadUser = function () {
        Udata.get({
          username: $routeParams.username
        }, function (response) {
          $scope.user = response.user
          $scope.events = response.events
          console.log(response.events);
        })
      }

      $scope.updateUser = function () {
        delete $scope.user.joinDate
        var data = $scope.user
        data.$update(function () {
          $location.path('/profile/' + data.username)
        })

      }

  })
