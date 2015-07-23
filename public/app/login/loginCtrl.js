var app = angular.module('personalProject')
    .controller('loginCtrl', ['$scope', '$http', 'loginService', '$firebaseAuth', function($scope, $http, loginService, $firebaseAuth) {

        var rootRef = 'https://grainbilld.firebaseio.com/',
            ref = new Firebase(rootRef),
            authObj = $firebaseAuth(ref),
            authData = loginService.authData;


        if(authData) {
            $scope.authData = authData.password.email;
                console.log(authData)
                $scope.showLogOut = true;
                $scope.showLogin = false;
        } else {
            $scope.authData = 'Please log in to save recipes!'
            $scope.showLogin = true;
            $scope.showLogOut = false;
        }


        $scope.login = function(email, password) {
            loginService.login($scope.user.email, $scope.user.password)
            $scope.user = '';
            $scope.newUser = '';
        }

        $scope.register = function(email, password) {
            loginService.register($scope.newUser.email, $scope.newUser.password);
            $scope.user = '';
            $scope.newUser = '';
        }

        $scope.logout = function(authObj) {
            loginService.authObj.$unauth();
        }

    }]);
