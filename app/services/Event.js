angular.module('BikeRoute')
.factory('Event', function ($resource) {
  return $resource('/api/event/:eventid', {
      eventid: 'eventid'
  }, {
    update: {
      method: 'PUT'
    }
  });
});
