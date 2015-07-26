angular.module('personalProject')
.service('loginService', ['$firebaseAuth', '$firebaseObject', '$location', function($firebaseAuth, $firebaseObject, $location) {

    var rootRef = 'https://grainbilld.firebaseio.com/',
        ref = new Firebase(rootRef);
    this.authObj = $firebaseAuth(ref);
    this.authData = this.authObj.$getAuth();

    this.redirect = function(authData) {
        if(authData) {
            $location.url('/MyRecipes');
        }
    }


    this.register = function(email, password) {
        this.authObj.$createUser({
            email: email,
            password: password
        }).then(function(userData) {
            console.log('Registered:', userData);
            this.login(email, password);
            $location.url('/MyRecipes')
        }.bind(this));
    };

    this.login = function(email, password) {
        this.authObj.$authWithPassword({
            email: email,
            password: password
        }).then(function(err, userData) {
            console.log('Logged in:', userData, err);
            $location.url('/MyRecipes')
        });
    };

}]);
