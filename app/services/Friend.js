angular.module('BikeRoute')
.factory('Friend', function ($resource) {
    return $resource('/api/friend/', {},
    {
      update: {method: 'PUT'}
    })
  })
