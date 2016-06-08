angular.module('BikeRoute')
.controller('StartController', function ($scope, $location, Event, $cookies, $http, NgMap) {

  $scope.redirectProfile = function () {
    user = $cookies.get('user')
    $location.path('/profile/'+user)
  }

  function loadRoute(evt) {
    $scope.path = [[]]
    $scope.positions = $scope.path
    var coor = evt
    $scope.center = coor[0]
    for (var i = 0; i < coor.length; i++) {
      $scope.path.push(coor[i])
    }
  }

  $scope.selectedRow = null
  $scope.setClickedRow = function(index){
   $scope.selectedRow = index;
   loadRoute($scope.routes[index].path.coordinates[0])
}

  $scope.loadAll = function () {
   $http.get('/api/getall/').success(function(response){
     $scope.routes = response
     loadRoute($scope.routes[0].path.coordinates[0])
  }).error(function(error){
     console.error(error);
  });
  }

})
