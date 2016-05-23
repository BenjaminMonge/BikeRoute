
(function functionName(){
  angular.module('BikeRoute')
  .controller('EventController',
  function($scope, $http, $location, $routeParams, Edata) {

        $scope.loadEvent = function () {
          Edata.get({eventid: $routeParams.eventid}, function (event) {
            $scope.event = event
          })
        }


  })
}())
