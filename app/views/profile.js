(function functionName(){
  angular.module('BikeRoute')
  .controller('ProfileController', ['$scope', '$http', '$location',
                           function($scope,   $http,   $location) {

        $scope.loadUser = function () {
          $scope.user
        }


        $scope.editProfile = function() {
          $location.path('/editprofile')
            $http.post('api/user/creation', $scope.newUser
          ).then(function successCallback(response) {
          }, function errorCallback(response) {
            console.log("error ocurred");
          })
        }
  }])
}())
