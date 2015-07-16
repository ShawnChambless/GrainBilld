var app = angular.module('personalProject')
    .controller('loginCtrl', ['$scope', 'loginService', '$firebaseObject', function($scope, loginService, $firebaseObject) {
        $scope.authObj = loginService.authObj;
        loginService.authObj.$getAuth();
        var ub;
        loginService.authObj.$onAuth(function(authData) {
            if(authData) {
                $scope.user = '';
                $scope.newUser = '';
                $scope.showSignIn = true;
                $scope.showSignUp = false;
            }
            else {
                $scope.showSignIn = false;
            }
            $scope.authData = authData;
            var userRef = new Firebase('https://grainbilld.firebaseio.com/users/' + authData.uid),
                user = $firebaseObject(userRef);
            user.$loaded().then(function(user) {
                user.$bindTo($scope, 'user').then(function(ub) {
                    unbind = ub;
                });
            });
        });

        $scope.register = function(email, password) {
            loginService.register({
                email: $scope.newUser.email,
                password: $scope.newUser.password
            });
        };
        $scope.login = function(email, password) {
                loginService.login({
                    email: email,
                    password: password
                });
        };
        $scope.loginWithFacebook = function() {
            loginService.loginWithFacebook();
        };
        $scope.loginWithTwitter = function() {
            loginService.loginWithTwitter();
        };
        $scope.loginWithGoogle = function() {
            loginService.loginWithGoogle();
        };

    }]);
