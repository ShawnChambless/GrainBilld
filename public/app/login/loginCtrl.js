var app = angular.module('personalProject')
    .controller('loginCtrl', ['$scope', '$http', 'loginService', function($scope, $http, loginService) {

        $scope.authData = loginService.authData;
        $scope.user = '';
        $scope.newUser = '';

        $scope.login = function(email, password) {
            loginService.login($scope.user.email, $scope.user.password)
        }

        $scope.register = function(email, password) {
            loginService.register($scope.newUser.email, $scope.newUser.password)
        }


    }]);
