var app = angular.module('personalProject')
    .controller('loginCtrl', ['$scope', '$http', 'loginService', function($scope, $http, loginService) {

        $scope.facebookLogin = function() {
            return $http({
                method: 'GET',
                url: 'http://localhost:8081/auth/facebook'
            }).then(function(resp) {
                console.log(resp)
            });
        };

        // $scope.logout = function() {
        //     return $http({
        //         method: 'GET',
        //         url: 'http://localhost:8081/logout'
        //     }).then(function(resp) {
        //         console.log(resp);
        //     });
        // };

    }]);
