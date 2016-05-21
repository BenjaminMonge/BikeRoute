(function functionName(){
  angular.module('BikeRoute')
  .controller('ProfileController', ['$scope', '$http', '$location',
                           function($scope,   $http,   $location) {


        $scope.loadUser = function () {
          authen = {
            username: localStorage.getItem('jwt')
          }
          console.log(authen)
          $http.post('api/user/get', authen
        ).then(function successCallback (res) {
            console.log(res.data);
            $scope.user = res.data
            $scope.events = res.data.Events

          }, function errorCallback (res) {

          })
        }

        $scope.updateUser = function () {
          authen = {
            username: localStorage.getItem('jwt'),
            userdata: $scope.user
          }

          delete authen.userdata.Events
          
        $http.post('api/user/update', authen
        ).then(function successCallback (res) {
              $scope.user = res.data
            }, function errorCallback (res) {

            })

        }

  }])
}())
