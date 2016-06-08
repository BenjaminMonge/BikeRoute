angular.module('BikeRoute')
.controller('ProfileController',
  function($scope, User, $location, $routeParams, $rootScope, Friend, $route, Change, NgMap) {
    Change.check();

    var willedit = true;
    var canadd = true;
    var allow = false

    $scope.canedit = function () {
      return willedit
    }

    $scope.canadd = function () {
      return canadd
    }

    $scope.admit = function () {
      allow = true
    }

    $scope.allow = function () {
      return allow
    }



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

    $scope.loadUser = function () {
       User.get({
         username: $routeParams.username
       }, function (response) {
         $scope.user = response.user
         $scope.friends = response.friendlist
         $scope.candidates = response.friendwant
         if($scope.user.username === $rootScope.currentUser.username) {willedit=true}
         if(response.friendlist === $rootScope.currentUser.username) {canadd=false}
        if(response.friendwant === $rootScope.currentUser.username) {canadd=false}
         if ($scope.user.Events[0]) {
           loadRoute($scope.user.Events[0].path.coordinates[0])
         }
       })
     }

     $scope.updateUser = function (isValid) {
       if(isValid) {
         delete $scope.user.joinDate
         data = $scope.user

         var fd = new FormData();
          for (var key in data) {
              fd.append(key, data[key]);
          }

          User.update({}, fd).$promise.then(function (response) {
            //$route.reload()
          })
       }
      }

      $scope.addUser = function () {
        console.log($routeParams.username);
        Friend.save({username: $routeParams.username}, function (response) {
          $route.reload()
        })
      }

      $scope.acceptFriend = function (ind) {
        var us = $scope.candidates[ind]
        console.log(us);
        Friend.update({username: us}, function (response) {
          $route.reload()
        })
      }

      $scope.rejectUser = function (ind) {
        var us = $scope.candidates[ind]
        Friend.delete({username: us}, function (response) {
          $route.reload()
        })
      }

      $scope.deleteFriend = function (ind) {
        console.log(ind);
        var fr = $scope.friends[ind]
        console.log(fr);
        Friend.delete({username: fr}, function (response) {
          $route.reload()
        })
      }

      $scope.deleteUser = function () {
        console.log('posted');
        User.delete({}, function () {
          $location.path('/')
        })
      }

      $scope.loadThis = function (ind) {
        console.log(ind);
        console.log($scope.user.Events[0]);
        var name = $scope.user.Events[ind].eventid
        $location.path('/event/'+ name)
      }

      $scope.goUser = function (ind) {
        var usrname = $scope.candidates[ind]
        $location.path('/profile/' + usrname)
      }

      $scope.goFriend = function (ind) {
        console.log(ind);
        var usrname = $scope.friends[ind]
        $location.path('/profile/' + usrname)
      }
  })
