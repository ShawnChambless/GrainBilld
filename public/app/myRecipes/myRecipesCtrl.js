angular.module('personalProject')
.controller('recipeCtrl', ['$scope', 'recipeService', function($scope, recipeService) {

    $scope.recipes = recipeService.getRecipes();

}]);
