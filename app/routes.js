var routeProvider
angular.module('BikeRoute', ['ngRoute', 'ngResource', 'http-auth-interceptor',
'ngAnimate', 'ngCookies', 'ngMap'])
  .config(($routeProvider, $locationProvider) => {


    $routeProvider
    .when('/', {templateUrl: 'app/views/home.html', controller: 'HomeController'})
    .when('/signup', {templateUrl: 'app/views/signup.html', controller: 'SignupController'})
    .when('/profile/:username', {templateUrl: 'app/views/profile.html', controller: 'ProfileController'})
    .when('/event/:eventid', {templateUrl: 'app/views/event.html', controller: 'EventController'})
    .otherwise({redirectTo: '/'})

  })

  .run(['$rootScope' ,'$location', 'Auth', function ($rootScope, $location, Auth) {
    $rootScope.$watch('currentUser', function (currentUser) {
     console.log(currentUser);
    if (!currentUser && (['' ,'/', '/signup'].indexOf($location.path()) == -1)){
        Auth.currUser()
    }
  });

  $rootScope.$on('event:auth-loginRequired', function() {
      $location.path('/');
      return false;
    });

    }])
