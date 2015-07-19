var app = angular.module('personalProject')
    .controller('loginCtrl', ['$scope', '$http', 'loginService', function($scope, $http, loginService) {

        $scope.login = function(user) {
            return $http({
                method: 'POST',
                url: 'http://localhost:8081/auth/local',
                data: {
                    email: user.email,
                    password: user.password
                }
            }).then(function(resp) {
                console.log(resp);
            });
        };

        $scope.register = function(newUser) {
            return $http({
                method: 'POST',
                url: 'http://localhost:8081/register/user',
                data: {
                    email: newUser.email,
                    password: newUser.password
                }
            }).then(function(newUser, err) {
                //$scope.login(newUser)
                $scope.displayName = newUser.data.email
                console.log(newUser)
            });
        };


    }]);
