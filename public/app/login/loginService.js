angular.module('personalProject')
.service('loginService', ['$http', '$q', function($http, $q) {

    var currUser = null;
    this.currentUser = function(){ return currUser; };

    this.getCurrentUser = function() {
        var dfd = $q.defer();
        $http({
            method: 'GET',
            url:    'http://grainbilld.com/api/user/'
        }).success(function(user) {
            currUser = user;
            dfd.resolve(user);
        }).error(function(err) {
            dfd.reject(err);
        });
        return dfd.promise;
    };

    this.register = function(firstName, lastName, email, password) {
        var dfd = $q.defer();
        $http({
            method: 'POST',
            url:    'http://grainbilld.com/auth/local/signup',
            data: {
                firstName:  firstName,
                lastName:   lastName,
                email:      email,
                password:   password
            }
        }).then(function(resp) {
            dfd.resolve(resp.data);
        }, function(err) {
            dfd.reject(err);
        });
        return dfd.promise;
    };

    this.login = function(email, password) {
        var dfd = $q.defer();
        $http({
            method: 'POST',
            url: 'http://grainbilld.com/auth/local/login',
            data: {
                email:      email,
                password:   password
            }
        }).then(function(resp) {
            currUser = resp.data;
            dfd.resolve(resp.data);
        }, function(err) {
            dfd.reject(err);
        });
        return dfd.promise;
    };

}]);
