angular.module('BikeRoute')
  .controller('HomeController',
    function($scope, Auth, $location) {

        $scope.login = function() {
          Auth.login('password', {
         'username': $scope.user.username,
         'password': $scope.user.password
       },
       function(err) {
         if (!err) {
          $location.path('/')
         } else {
           console.log(err)
         }
     });
        }
  })
