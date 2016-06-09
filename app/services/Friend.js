angular.module('BikeRoute')
.factory('Friend', function ($resource) {
    return $resource('/api/friend/', {username: 'username'},
    {
      update: {method: 'PUT'}
    })
  })
