var app = angular.module('personalProject')
    .controller('loginCtrl', ['$scope', '$http', 'loginService', function($scope, $http, loginService) {

        $scope.register = function(newUser) {
            return $http({
                method: 'POST',
                url: 'http://localhost:8081/register/user',
                data: {
                    email: newUser.email,
                    password: newUser.password
                }
            });
        };

    }]);
