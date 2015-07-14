var app = angular.module('personalProject')
    .controller('loginCtrl', ['$scope', 'loginService', '$firebaseObject', function($scope, loginService, $firebaseObject) {
        $scope.authData = loginService.authObj.$getAuth();
        var ub;
        loginService.authObj.$onAuth(function(authData) {
            if(authData) {
                $scope.user.email = '';
                $scope.user.password = '';
                $scope.showSignIn = true;
                $scope.showSignUp = false;
            }
            loginService.authData = authData;
            var userRef = new Firebase('https://grainbilld.firebaseio.com/users/' + authData.uid),
                user = $firebaseObject(userRef);
            user.$loaded().then(function(user) {
                user.$bindTo($scope, 'user').then(function(ub) {
                    unbind = ub;
                });
            });
        });

        $scope.register = function() {
            loginService.register($scope.newUser).then(function() {
                $scope.authData = loginService.authObj.$getAuth();
            });
        };
        $scope.login = function(authData) {
            loginService.login($scope.user).then(function() {
                $scope.authData = loginService.authObj.$getAuth();
            });
        };
        $scope.logout = function(authobj, ub) {
            loginService.authObj.$unauth();
            unbind();
        };


    }]);
