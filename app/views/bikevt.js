
(function functionName(){
  angular.module('BikeRoute')
  .controller('BikevtController', ['$scope', '$http', '$location', '$routeParams',
                           function($scope,   $http,   $location, $routeParams) {

        $scope.goUser = function() {
          console.log($routeParams.evt_id + 1)
          $location.path('/profile')
            $http.post('api/user/creation', $scope.newUser
          ).then(function successCallback(response) {
          }, function errorCallback(response) {
            console.log("error ocurred");
          })
        }
  }])
}())
