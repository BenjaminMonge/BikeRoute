angular.module('BikeRoute').factory('Change',
  function ($rootScope, $location, Auth) {

  return {
    check: function () {
    $rootScope.$watch('currentUser', function (currentUser) {
      if (!currentUser && (['' ,'/', '/conocenos'].indexOf($location.path()) == -1)){
          Auth.currUser();
      }
    })

   $rootScope.$on('event:auth-loginRequired', function() {
        console.log('redirect');
        $location.path('/');
        return false;
      })


    }
  }

})
