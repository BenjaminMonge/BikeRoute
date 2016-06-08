angular.module('BikeRoute')
.controller('StartController', function ($scope, $location, $http, NgMap, Auth, Change, $rootScope) {
  Change.check()

  $scope.redirectProfile = function () {
    var name = $rootScope.currentUser.username
    $location.path('/profile/' + name)
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
     console.log(response);
     $scope.routes = response
     if ($scope.routes) {
       loadRoute($scope.routes[0].path.coordinates[0])
     }
  }).error(function(error){
     console.error(error);
  });
  }

  $scope.logout = function () {
    Auth.logout()
  }

})
