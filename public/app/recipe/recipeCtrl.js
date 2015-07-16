angular.module('personalProject')
.controller('recipeCtrl', ['$scope', 'recipeService', function($scope, recipeService) {

    $scope.saveRecipe = function() {
        recipeService.saveRecipe();
        console.log('pressed');
    }

}]);
