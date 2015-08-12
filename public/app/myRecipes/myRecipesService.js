angular.module('personalProject')
.service('recipeService', ['$http', function($http) {

    this.getRecipes = function() {
        return $http({
            method: 'GET',
            url:    'http://localhost:8080/api/recipes'
        });
    };

}]);
