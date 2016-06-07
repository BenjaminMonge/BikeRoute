angular.module('BikeRoute')
.factory('Comment', function ($resource) {
    return $resource('/api/comment/')
  })
