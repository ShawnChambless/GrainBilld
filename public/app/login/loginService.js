angular.module('personalProject')
.service('loginService', ['$firebaseAuth', '$firebaseObject', '$location', function($firebaseAuth, $firebaseObject, $location) {

    var rootRef = 'https://grainbilld.firebaseio.com/',
        ref = new Firebase(rootRef);
    this.authObj = $firebaseAuth(ref);
    this.authData = this.authObj.$getAuth();

    this.authObj.$onAuth(function(authData) {
        if(authData) {
            $location.url('/NewBatch');
        }
    }).bind(this);


    this.register = function(email, password) {
        this.authObj.$createUser({
            email: email,
            password: password
        }).then(function(userData) {
            console.log('Registered:', userData);
            this.login(email, password);
        }.bind(this));
    };

    this.login = function(email, password) {
        this.authObj.$authWithPassword({
            email: email,
            password: password
        }).then(function(err, userData) {
            console.log('Logged in:', userData, err);
        })
    }

}]);
