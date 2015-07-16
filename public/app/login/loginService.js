angular.module('personalProject')
.service('loginService', ['$firebaseAuth', function($firebaseAuth) {

    this.ref = 'https://grainbilld.firebaseio.com/';
    this.firebaseRef = new Firebase(this.ref);
    this.authObj = $firebaseAuth(this.firebaseRef);
    var authObj = this.authObj;

    this.register = function(email, password) {
        this.authObj.$createUser(email, password).then(function(authData) {
            console.log(authData);
            authObj.$authWithPassword(email, password).then(function(resp) {
                console.log(resp);
            });
        });
    };

    this.login = function(email, password) {
        this.authObj.$authWithPassword(email, password).then(function(authData, user) {
            console.log('logged in', user, authData);
        }, function(err) {
            alert(err);
        });
    };
    this.loginWithFacebook = function() {
        authObj.$authWithOAuthPopup("facebook").then(function(authData, error) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                console.log("Authenticated successfully with Facebook:", authData);
            }
        });
    };

    this.loginWithTwitter = function() {
        authObj.$authWithOAuthPopup("twitter").then(function(authData, error) {
          if (error) {
            console.log("Login Failed!", error);
          } else {
            console.log("Authenticated successfully with Twitter:", authData);
          }
        });
    };

    this.loginWithGoogle = function() {
        authObj.$authWithOAuthPopup("google").then(function(authData, error) {
            if (error) {
                console.log("Login Failed!", error);
        } else {
            console.log("Authenticated successfully with Google:", authData);
        }
        });
    };

}]);
