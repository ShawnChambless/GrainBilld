var app = angular.module('personalProject')
.controller('loginCtrl', ['$scope', 'loginService', '$state', function($scope, loginService, $state) {

    $scope.register = function(firstName, lastName, email, password) {
        loginService.register(firstName, lastName, email, password).then(function(resp) {
            $state.go('NewBatch');
        });
    };

    $scope.login = function(email, password) {
        loginService.login(email, password).then(function(resp) {
            $state.go('NewBatch');
            $scope.email = '';
            $scope.password = '';
        }).catch(function(err) {
            console.log(err);
            $scope.email = '';
            $scope.password = '';
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
