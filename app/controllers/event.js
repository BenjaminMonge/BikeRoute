angular.module('BikeRoute')
 .controller('EventController',
  function ($scope, Event, $location, $routeParams, ngMap) {

        /* All the code for the map to work*/
        var vm = this
        vm.path = [[]]
        vm.positions = vm.path

        vm.addMarkerAndPath = function (event) {
         vm.path.push([event.latLng.lat(), event.latLng.lng()])
        }

        vm.loadRoute = function () {
          var coor = [[],[13.691106146862403,-89.22640800476074],
          [13.691356322382264,-89.21919822692871],
          [13.68877116251188,-89.21370506286621],
          [13.684101124282016,-89.20529365539551],
          [13.691022754963313,-89.20701026916504],
          [13.697277065333209,-89.20846939086914],
          [13.696776726625743,-89.19877052307129],
          [13.69252380462292,-89.19550895690918],
          [13.689188125703035,-89.20297622680664]]

          for (var i = 0; i < coor.length; i++) {
            vm.path.push(coor[i])
          }
        }

        vm.deleteMarkers = function() {
          if(vm.path.length > 0){
            vm.path.splice((vm.path.length-1), 1)
          }
        }

        vm.saveRoute = function () {
          var route = angular.toJson(vm.path)
        }
        /* End of map code and start of the functions that provide the functionality*/


        $scope.comment = function () {  /* User can post a comment*/
          $scope.bikeevent.comment = {
            content: 'I COMMENTED',
            datePosted: new Date()
          }
          var bikeevent = $scope.bikeevent
          bikeevent.$update(function () {
            $location.path('/event/' + bikeevent.eventid)
          })
        }

        $scope.participate = function () {  /* Method to add the user to the attendance list*/
          var upt = {
            eventid: $scope.bikeevent
          }
          Event.update(bikeevent ,function () {
              $location.path('/event/' + bikeevent.eventid)
          })
        }

        $scope.loadEvent = function () {   /* Retrieves all the event information from the database*/
          Event.get({eventid: $routeParams.eventid}, function (bikeevent) {
            $scope.bikeevent = bikeevent
          })
        }

  })
