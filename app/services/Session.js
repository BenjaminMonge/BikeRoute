angular.module('BikeRoute')
.factory('Session', function ($resource) {
    return $resource('/auth/session/')
  })
