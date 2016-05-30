angular.module('BikeRoute')
.controller('ProfileController',
  function($scope, User, $location, $routeParams, $rootScope) {

    $scope.loadUser = function () {
       User.get({
         username: $routeParams.username
       }, function (response) {
         console.log(response);
         $scope.user = response.user
         $scope.events = response.events
         console.log(response.events);
       })
     }

      $scope.updateUser = function (file) {
        delete $scope.user.joinDate
        data = {
          user: $scope.user,
          file: file
        }
        User.update(user, function () { /* En lugar de redirigir hay que intentar traer la informacion y renderizarla utilizando scope*/
          $location.path('/profile/' + user.username)
        })
      }

  })
