var app = angular.module('personalProject')
.controller('loginCtrl', ['$scope', '$http', 'loginService', function($scope, $http, loginService) {

    $scope.register = function(firstName, lastName, email, password) {
        loginService.register(firstName, lastName, email, password);
    };

    $scope.login = function(email, password) {
        loginService.login(email, password);
    };

}]);
