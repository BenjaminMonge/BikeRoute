var routeProvider
angular.module('BikeRoute', ['ngRoute', 'ngResource', 'http-auth-interceptor',
'ngAnimate', 'ngCookies', 'ngMap'])
  .config(($routeProvider, $locationProvider) => {

    $routeProvider
    .when('/', {templateUrl: 'app/views/home.html', controller: 'HomeController'})
    .when('/create', {templateUrl: 'app/views/eventcreate.html', controller: 'EventController'})
    .when('/profile/:username', {templateUrl: 'app/views/profile.html', controller: 'ProfileController'})
    .when('/event/:eventid', {templateUrl: 'app/views/event.html', controller: 'EventController'})
    .when('/conocenos', {templateUrl: 'app/views/conocenos.html'})
    .when('/discover', {templateUrl: 'app/views/discover.html', controller: 'StartController'})
    .otherwise({redirectTo: '/'})
  })

    .run(function ($rootScope, $location) {
      $rootScope.$on('event:auth-loginRequired', function() {
           console.log('redirect');
           $location.path('/');
           return false;
         })
    })

    .directive('customFileInput', function() {
    return {
      restrict: 'EA',
      require: 'ngModel',
      link: function(scope, element, attrs, ngModelCtrl) {
        var fileInput = element[0].querySelector('input[type=file]');

        fileInput.addEventListener('change', handleFileInput);

        scope.$on('$destroy', function() {
          fileInput.removeEventListener('change', handleFileInput);
        });

        function handleFileInput(evt) {
          if (!this.files || !this.files[0]) { return; }

          var loadedFile = this.files[0];

          scope.$apply(function() {
            ngModelCtrl.$setViewValue(loadedFile);
          });

        }

      }
    };
  })
