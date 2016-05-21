var app = angular.module('BikeRoute')

app.factory('AuthService', ['$location', '$rootScope', 'Session',
  function ($location, $rootScope, Session) {


    return {
      login: function(provider, user, callback) {
        var cb = callback || angular.noop;
        Session.save({
          provider: provider,
          username: user.username,
          password: user.password,
          rememberMe: user.rememberMe
        }, function(response) {
          var tok = response.id_token
          localStorage.setItem('jwt', tok);
          $location.path('/profile/'+tok)
          return cb()
        }, function(err) {
          return cb(err.data);
        });
      }
    }

    }])
