angular.module('BikeRoute')
  .controller('SignupController',
    function($scope, Auth, $location) {

        $scope.createUser = function (form) {
            $scope.member.joinDate = new Date().getTime()
            var member = angular.toJson($scope.member)
            Auth.createUser(member, function (username, err) {
              if (!err){
                $location.path('/profile/' + username)
              } else {
                console.log(err)
              }
            })
        }
  })
