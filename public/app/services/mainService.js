var app = angular.module('personalProject');

app.service('mainService', function($http, $q) {
    this.grainInRecipe = [];
    this.hopsInRecipe = [];
    this.yeastInRecipe = [];

    this.getGrainsInDb = function(grainName) {
        if (!grainName) {
            return $http({
                method: 'GET',
                url: 'http://localhost:8081/database/ingredients/grain/'
            });
        }
        else {
            return $http({
                method: 'GET',
                url: 'http://localhost:8081/database/ingredients/grain/?name=' + grainName
            });
        }
    };

    this.getHopsInDb = function(hopsName) {
        if(!hopsName) {
            return $http({
                method: 'GET',
                url: 'http://localhost:8081/database/ingredients/hops/'
            });
        }
        else {
            return $http({
                method: 'GET',
                url: 'http://localhost:8081/database/ingredients/hops/?name=' + hopsName
            });
        }

    };

    this.getYeastInDb = function(yeastName) {
        if(!yeastName) {
                return $http({
                method: 'GET',
                url: 'http://localhost:8081/database/ingredients/yeast/'
            }).then(function(resp) {
                return resp;
                console.log('Got Yeast in DB',resp)
            });
        }
        else {
            return $http({
            method: 'GET',
            url: 'http://localhost:8081/database/ingredients/yeast/?name=' + yeastName
        });
        }

    };

    this.updateSG = function(updateSG, itemId) {
        return $http({
            method: 'PUT',
            url: 'http://localhost:8081/database/ingredients/grain/' + itemId,
            data: {
                "sg": updateSG
            }
        });
    };

});
