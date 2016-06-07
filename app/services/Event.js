angular.module('BikeRoute')
.factory('Event', function ($resource) {
  return $resource('/api/event/:eventid', {
      eventid: 'eventid'
  }, {
    create: {
      method: 'POST',
      transformRequest: angular.identity,
      headers: { 'Content-Type': undefined }
    },
    update: {
      method: 'PUT'
    }
  });
});
