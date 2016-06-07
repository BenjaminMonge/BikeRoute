angular.module('BikeRoute')
 .factory('User', function ($resource) {
    return $resource('/api/user/:username',
    {username: 'username'},{
    update: {
      method: 'PUT',
      transformRequest: angular.identity,
      headers: { 'Content-Type': undefined }
  }
 })
})
