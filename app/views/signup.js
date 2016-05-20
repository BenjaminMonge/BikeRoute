(function functionName(){
  angular.module('BikeRoute')
  .controller('SignupController', ['$scope', '$http', '$location',
                           function($scope,   $http,   $location) {

        $scope.createUser = function (form) {
            $scope.member.joinDate = new Date().getTime()
            $http.post('api/user/create', $scope.member
          ).then(function successCallback (response) {
                console.log('Created')
                $location.path('/home')
          }, function errorCallback (response) {
                $location.path('/signup')
          })
        }
  }])
}())
