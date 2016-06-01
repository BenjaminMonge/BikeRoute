angular.module('BikeRoute')
.controller('ProfileController',
  function($scope, User, $location, $routeParams, $rootScope) {

    $scope.loadUser = function () {
       User.get({
         username: $routeParams.username
       }, function (response) {
         $scope.user = response.user
         $scope.events = response.events
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
          console.log(res);
          $scope.user = res

        })
      }
  })
