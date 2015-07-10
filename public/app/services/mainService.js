var app = angular.module('personalProject');

app.service('mainService', function($http, $q) {

    this.getGrainsInDb = function() {
        return $http({
            method: 'GET',
            url: 'http://localhost:8081/database/ingredients/grain/'
        });
    };
    this.getHopsInDb = function() {
        return $http({
            method: 'GET',
            url: 'http://localhost:8081/database/ingredients/hops/'
        });
    };
    this.getYeastInDb = function() {
        return $http({
            method: 'GET',
            url: 'http://localhost:8081/database/ingredients/yeast/'
        });
    };

});
