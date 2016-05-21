var app = angular.module('BikeRoute')
app.factory('Session', function ($resource) {
    return $resource('api/user/auth')
  })
