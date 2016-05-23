angular.module('BikeRoute')
.factory('Udata', function ($resource) {
  return $resource('/api/user/:username', {
      username: 'username'
  }, {
    'update': {
      method: 'PUT'
    }
  });
});
