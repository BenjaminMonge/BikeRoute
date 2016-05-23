angular.module('BikeRoute')
.factory('Edata', function ($resource) {
  return $resource('/api/event/:eventid', {
      eventid: 'eventid'
  }, {
    'update': {
      method: 'PUT'
    }
  });
});
