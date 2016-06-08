angular.module('BikeRoute')
.controller('ProfileController',
  function($scope, User, $location, $routeParams, $rootScope, Friend, $route, Change, NgMap) {
    Change.check();

    /*Codigo para el mapa*/
    /*$scope.path = [[]]
    $scope.positions = $scope.path*/

    function loadRoute(evt) {
      $scope.path = [[]]
      $scope.positions = $scope.path
      var coor = evt
      $scope.center = coor[0]
      for (var i = 0; i < coor.length; i++) {
        $scope.path.push(coor[i])
      }
    }

    /*Codigo para el mapa*/

    /*Codigo para seleccionar rutas*/
    $scope.selectedRow = null
    $scope.setClickedRow = function(index){
     $scope.selectedRow = index;
     loadRoute($scope.user.Events[index].path.coordinates[0])
  }
    /**/
    $scope.loadUser = function () {
       User.get({
         username: $routeParams.username
       }, function (response) {
         $scope.user = response.user
         $scope.friends = response.friendlist
         $scope.candidates = response.friendwant
         loadRoute($scope.user.Events[0].path.coordinates[0])
       })
     }

     $scope.updateUser = function () {
       delete $scope.user.joinDate
       data = $scope.user

       var fd = new FormData();
        for (var key in data) {
            fd.append(key, data[key]);
        }

        User.update({}, fd).$promise.then(function (response) {
          $scope.user = response.user
        })
      }

      $scope.addUser = function () {
        console.log($routeParams.username);
        Friend.save({username: $routeParams.username}, function (response) {
          $route.reload();
        })
      }

      $scope.acceptFriend = function () {
        Friend.update({username: $routeParams.username}, function (response) {
          $route.reload()
        })
      }

      $scope.rejectUser = function () {
        Friend.delete({username: $routeParams.username}, function (response) {
          $route.reload()
        })
      }

      $scope.deleteUser = function () {
        console.log('posted');
        User.delete({}, function () {
          $location.path('/')
        })
      }

      $scope.loadThis = function () {
        console.log('display route');
      }
  })
