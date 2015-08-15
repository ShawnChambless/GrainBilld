angular.module('personalProject')
.service('recipeService', ['$http', function($http) {
    this.user = {};
    this.getRecipes = function(userId) {
        return $http({
            method: 'GET',
            url:    'http://localhost:8080/api/recipes/' + userId
        });
    };

}]);
