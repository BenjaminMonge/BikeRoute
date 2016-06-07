angular.module('BikeRoute')
.factory('Auth',
  function ($location, $rootScope, Session, User, $cookies) {
    $rootScope.currentUser = $cookies.get('user') || null
    //$cookies.remove('user')

    return {
      /* Describe el comportamiento para iniciar sesion*/
      login: function(provider, user, callback) {
        var cb = callback || angular.noop;
        Session.save({
          provider: provider,
          username: user.username,
          password: user.password,
          rememberMe: user.rememberMe
        }, function(user) {  /* La funcion devuelve el usuario y asigna su informacion*/
          $rootScope.currentUser = user
          $cookies.put('user', user.username)
          return cb(user.username, null)
        }, function( err) {
          return cb(null, err.data);
        });
      },
/* Usan el servicio usuario para crear y modificar el usuario actual*/
      createUser: function(userinfo, callback) {
        var cb = callback || angular.noop;
        User.save(userinfo,
          function(user) {
            $rootScope.currentUser = user;
            return cb(user.username);
          },
          function(err) {
            return cb(err.data);
          });
      },

      currUser: function() {
        Session.get(function(user) {
          $rootScope.currentUser = user;
        });
      },

      changePassword: function(username, oldPassword, newPassword, callback) {
        var cb = callback || angular.noop;
        User.update({
          username: username,
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function(user) {
            console.log('password changed');
            return cb()
        }, function(err) {
            return cb(err.data);
        });
      },

      removeUser: function(username, password, callback) {
        var cb = callback || angular.noop
        User.delete({
          username: email,
          password: password
        }, function(user) {
            console.log(user + 'removed');
            return cb();
        }, function(err) {
            return cb(err.data);
        })
      }

    }

    })
