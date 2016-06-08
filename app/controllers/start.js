angular.module('BikeRoute')
.controller('StartController', function ($scope, $location, Event, $cookies, $http, NgMap) {

  $scope.redirectProfile = function () {
    user = $cookies.get('user')
    $location.path('/profile/'+user)
  }

  $scope.loadAll = function () {
   $http.get('/api/getall/').success(function(response){
     console.log(response);
  }).error(function(error){
     console.error(error);
  });
  }

})
