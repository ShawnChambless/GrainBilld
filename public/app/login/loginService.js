var app = angular.module('personalProject')
.service('loginService', ['$firebaseAuth', '$q', function($firebaseAuth, $q) {

    this.ref = 'https://grainbilld.firebaseio.com/';
    this.firebaseRef = new Firebase(this.ref);
    this.authObj = $firebaseAuth(this.firebaseRef);

    this.register = function(newUser) {
        this.authObj.$createUser(newUser).then(function(authData) {
            console.log(authData);
        }, function(err) {
            alert(err);
        });
    };

    this.login = function(user) {
        var dfd = $q.defer();
        this.authObj.$authWithPassword(user).then(function(authData, user) {
            console.log('logged in', authData);
            dfd.resolve(authData);
        }, function(err) {
            alert(err);
        });
        return dfd.promise

        dfd.resolve(authData)
    }


}])
