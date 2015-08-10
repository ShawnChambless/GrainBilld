angular.module('personalProject')
.controller('recipeCtrl', ['$scope', 'recipeService', 'retrieveRecipes', function($scope, recipeService, retrieveRecipes) {
    console.log(retrieveRecipes);
    $scope.recipes = retrieveRecipes;


}]);
