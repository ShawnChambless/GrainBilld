angular.module('personalProject')
.service('recipeService', ['$firebaseArray', '$firebaseAuth', function($firebaseArray, $firebaseAuth) {
    this.rootRef = 'https://grainbilld.firebaseio.com/';
    this.ref = new Firebase(this.rootRef);
    this.authObj = $firebaseAuth(this.ref);
    this.authData = this.authObj.$getAuth();

    var authData = this.authData;

    var recipeRef = new Firebase(this.rootRef + 'users/' + authData.uid +  '/recipes');


    this.getRecipes = function() {
         return $firebaseArray(recipeRef.ref());
    };

}]);
