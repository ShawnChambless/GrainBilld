angular.module('personalProject')
.service('loginService', ['$location', '$http', function($location, $http) {

    this.register = function(firstName, lastName, email, password) {
        return $http({
            method: 'POST',
            url:    '/auth/local/signup',
            data: {
                firstName:  firstName,
                lastName:   lastName,
                email:      email,
                password:   password
            }
        }).then(function(resp) {
            this.login(email, password);
            console.log(resp.data);
            return resp.data;
        }.bind(this));
    };

    this.login = function(email, password) {
        return $http({
            method: 'POST',
            url: '/auth/local/login',
            data: {
                email:      email,
                password:   password
            }
        }).then(function(resp) {
            console.log(resp.data);
            return resp.data;
        });
    };

    this.getCurrentUser = function() {
        return $http({
            method: 'GET',
            url:    '/api/user'
        }).then(function(resp) {
            console.log(resp.data);
            return resp.data;
        });
    };

}]);
