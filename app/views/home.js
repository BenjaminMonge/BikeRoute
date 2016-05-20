
  var app = angular.module('BikeRoute')

app.controller('HomeController', ['$scope', '$http', '$location', 'AuthService',
                         function($scope,   $http,   $location, AuthService) {

        $scope.login = function(form) {
          AuthService.login('password', {
         'username': $scope.user.username,
         'password': $scope.user.password
       },
       function(err) {
         if (!err) {
         } else {
           $scope.error = err.message;
         }
     });
        }
  }])
