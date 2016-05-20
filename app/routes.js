var routeProvider
(() => {
  angular.module('BikeRoute', ['ngRoute', 'ngResource', 'http-auth-interceptor'])
  .config(($routeProvider, $locationProvider) => {

    $routeProvider
    .when('/', {templateUrl: 'app/views/home.html', controller: 'HomeController'})
    .when('/signup', {templateUrl: 'app/views/signup.html', controller: 'SignupController'})
    .when('/profile/:prof_id', {templateUrl: 'app/views/profile.html', controller: 'ProfileController'})
    .when('/myprofile', {templateUrl: function(params){ return 'app/views/bike/profile.html'; }, controller: 'BikevtController'})
    .when('/bikevt/:evt_id', {templateUrl: function(params){ return 'app/views/bikevt.html'; }, controller: 'BikevtController'})
    .otherwise({redirectTo: '/'})

  })

  .run(['$rootScope' ,'$location', function ($rootScope, $location) {
    $rootScope.$watch(function() { return $location.path(); }, function(newValue, oldValue){
    if (!localStorage.getItem('jwt') && (['' ,'/', '/signup'].indexOf(newValue) == -1)){
            $location.path('/signup');
    }
});

    }])

})()
