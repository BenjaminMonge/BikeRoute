angular.module('BikeRoute')
 .controller('EventController',
  function ($scope, Event, $location, $routeParams, NgMap, Comment, $route, Change) {
        Change.check();

        var actual = null;
        /* All the code for the map to work*/
        //vm = this
        $scope.path = [[]]
        $scope.path.shift()
        $scope.positions = $scope.path

        $scope.addMarkerAndPath = function (event) {
         $scope.path.push([event.latLng.lat(), event.latLng.lng()])
        }

        function loadRoute() {
          var coor = $scope.bikeevent.path.coordinates[0]
          for (var i = 0; i < coor.length; i++) {
            $scope.path.push(coor[i])
          }
        }

        $scope.deleteMarkers = function() {
          if($scope.path.length > 0){
            $scope.path.splice(($scope.path.length-1), 1)
          }
        }

        /* End of map code and start of the functions that provide the functionality*/

        $scope.create = function () { /* Method that creates the route*/
          var sub = angular.toJson($scope.path)
          $scope.route.path = sub
          $scope.route.startDate = new Date()
          var data = $scope.route
          var fd = new FormData();
           for (var key in data) {
               fd.append(key, data[key]);
           }

           Event.create({}, fd).$promise.then(function (res) {
              $location.path('/event/'+res.eventid)
           })
        }


        $scope.comment = function () {  /* User can post a comment*/
          var newcomm = {
            eventid: $routeParams.eventid,
            content: $scope.comm,
            datePosted: new Date()
          }
          Comment.save(newcomm, function (response) {
            console.log(response);
            $route.reload()
          })
        }

        $scope.deleteComm = function (ind) {
          //Comment.delete({})
        }

        $scope.participate = function () {  /* Method to add the user to the attendance list*/
          Event.update({eventid: $routeParams.eventid} ,function (response) {
            $route.reload();
          })
        }

        $scope.loadEvent = function () {   /* Retrieves all the event information from the database*/
          Event.get({eventid: $routeParams.eventid}, function (response) {
            $scope.bikeevent = response.bikeevent
            $scope.participants = response.participants
            $scope.comments = response.comments
            loadRoute()
          })
        }

        $scope.deleteEvent = function () {
          Event.delete({eventid: $routeParams.eventid}, function (res) {
            $location.path('/discover')
          })
        }

  })
