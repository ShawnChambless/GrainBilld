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
            }).then(function(resp) {
                return resp.data;
            });
        }
        else {
            return $http({
                method: 'GET',
                url: 'http://localhost:8081/database/ingredients/grain/?name=' + grainName
            }).then(function(resp) {
                return resp.data;
            });
        }
    };

    this.getHopsInDb = function(hopsName) {
        if(!hopsName) {
            return $http({
                method: 'GET',
                url: 'http://localhost:8081/database/ingredients/hops/'
            }).then(function(resp) {
                return resp.data;
            });
        }
        else {
            return $http({
                method: 'GET',
                url: 'http://localhost:8081/database/ingredients/hops/?name=' + hopsName
            }).then(function(resp) {
                return resp.data;
            });
        }

    };

    this.getYeastInDb = function(yeastName) {
        if(!yeastName) {
                return $http({
                method: 'GET',
                url: 'http://localhost:8081/database/ingredients/yeast/'
            }).then(function(resp) {
                return resp.data;
                console.log('Got Yeast in DB',resp)
            });
        }
        else {
            return $http({
            method: 'GET',
            url: 'http://localhost:8081/database/ingredients/yeast/?name=' + yeastName
        }).then(function(resp) {
            return resp.data;
            console.log('Got Yeast in DB from search text',resp)
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
