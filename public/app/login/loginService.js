angular.module('personalProject')
.service('loginService', ['$firebaseAuth', '$firebaseObject', function($firebaseAuth, $firebaseObject) {

    var rootRef = 'https://grainbilld.firebaseio.com/',
        ref = new Firebase(rootRef),
        authObj = $firebaseAuth(ref);


    this.register = function(email, password) {
        authObj.$createUser({
            email: email,
            password: password
        }).then(function(userData) {
            console.log('Registered:', userData);
            this.login(email, password);
        }.bind(this));
    };

    this.login = function(email, password) {
        authObj.$authWithPassword({
            email: email,
            password: password
        }).then(function(err, userData) {
            console.log('Logged in:', userData, err);
        });
    };

}]);
