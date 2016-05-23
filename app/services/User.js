angular.module('BikeRoute')
  .factory('User', function ($resource) {
    return $resource('/auth/users/:username/', {},
      {
        'update': {
          method:'PUT'
        }
      });
  });
