angular.module('BikeRoute')
  .controller('HomeController',
    function($scope, Auth, $location, $route) {
      
        $scope.login = function(isValid) {
          if(isValid){
            Auth.login('password', {
           'username': $scope.user.username,
           'password': $scope.user.password
         },
         function(username, err) {
           if (!err) {
            $location.path('/profile/'+ username)
           } else {
             console.log(err)
           }
       });
          }
        }

        $scope.signup = function (isValid) {
            if(isValid) {
              $scope.member.joinDate = new Date()
              var member = angular.toJson($scope.member)
              Auth.createUser(member, function (username, err) {
                if (!err){
                  $location.path('/profile/' + username)
                } else {
                  console.log(err)
                }
              })
            }

        }
  })
