angular.module('personalProject')
.service('recipeService', ['$http', '$firebaseArray', '$firebaseObject', 'loginService', 'mainService', function($http, $firebaseArray, $firebaseObject, loginService, mainService) {
    this.authData = loginService.authObj.$getAuth();
    this.ref = 'https://grainbilld.firebaseio.com';
    this.firebaseRef = new Firebase(this.ref);
    this.recipeRef = new Firebase(this.ref + '/' + this.authData.uid + '/recipes');

    this.saveRecipe = function(newRecipe) {
        newRecipe = {Grain: mainService.grainInRecipe, Hops: mainService.hopsInRecipe, Yeast: mainService.yeastInRecipe}
        this.recipeRef.$firebaseObject(newRecipe).then(function(resp) {
            console.log(resp);
        });
    }


}]);
