angular.module('personalProject')
.service('recipeService', ['$http', function($http) {
    this.user = {};
    this.getRecipes = function(userId) {
        console.log(userId);
        return $http({
            method: 'GET',
            url:    'http://grainbilld.com/api/recipes/' + userId
        });
    };

}]);
