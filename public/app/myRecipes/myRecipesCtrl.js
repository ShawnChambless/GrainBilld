angular.module('personalProject')
.controller('recipeCtrl', ['$scope', 'recipeService', 'retrieveRecipes', function($scope, recipeService, retrieveRecipes) {
    $scope.recipes = retrieveRecipes;


}]);
