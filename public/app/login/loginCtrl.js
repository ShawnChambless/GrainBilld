var app = angular.module('personalProject')
.controller('loginCtrl', ['$scope', 'loginService', '$state', '$timeout', function($scope, loginService, $state, $timeout) {
    $scope.showRegister = false;
    $scope.showLogin = true;
    $scope.register = function(firstName, lastName, email, password) {
        loginService.register(firstName, lastName, email, password).then(function(resp) {
            $scope.showSuccess = true;
            $state.go('NewBatch');
        }).catch(function(err) {
            $scope.showError = true;
        });
    };

    $scope.login = function(email, password) {
        loginService.login(email, password).then(function(resp) {
            $scope.showSuccess = true;
            $state.go('NewBatch');
            $scope.email = '';
            $scope.password = '';
            $scope.showError = false;
        }).catch(function(err) {
            $scope.showError = true;
        });
    };

    $scope.getCurrentUser = function(userId) {
        loginService.getCurrentUser().then(function(resp) {
            if(currUser === user);
            $state.go('NewBatch');
        }).catch(function(err) {
            console.log(err);
        });
    };

}]);
