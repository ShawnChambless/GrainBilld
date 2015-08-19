var app = angular.module('personalProject');

app.service('mainService',['$http', '$q', function($http, $q) {
    this.grainInRecipe  = [];
    this.hopsInRecipe   = [];
    this.yeastInRecipe  = [];
    this.grainAmount    = [];
    this.hopsAmount     = [];
    this.boilTime       = [];

    this.getGrainsInDb = function(grainName) {
        if (!grainName) {
            return $http({
                method: 'GET',
                url: 'http://localhost:8080/database/ingredients/grain/'
            });
        }
        else {
            return $http({
                method: 'GET',
                url: 'http://localhost:8080/database/ingredients/grain/?name=' + grainName
            });
        }
    };

    this.getHopsInDb = function(hopsName) {
        if(!hopsName) {
            return $http({
                method: 'GET',
                url: 'http://localhost:8080/database/ingredients/hops/'
            });
        }
        else {
            return $http({
                method: 'GET',
                url: 'http://localhost:8080/database/ingredients/hops/?name=' + hopsName
            });
        }

    };

    this.getYeastInDb = function(yeastName) {
        if(!yeastName) {
                return $http({
                method: 'GET',
                url: 'http://localhost:8080/database/ingredients/yeast/'
            }).then(function(resp) {
                return resp;
            });
        }
        else {
            return $http({
            method: 'GET',
            url: 'http://localhost:8080/database/ingredients/yeast/?name=' + yeastName
        });
        }

    };

    this.updateSG = function(updateSG, itemId) {
        return $http({
            method: 'PUT',
            url: 'http://localhost:8080/database/ingredients/grain/' + itemId,
            data: {
                "sg": updateSG
            }
        });
    };

    this.saveRecipe = function(grainInRecipe, hopsInRecipe, yeastInRecipe, recipeName, batchSize, efficiency, IBU, OG, FG, ABV, recipeSrm, currentUser) {
        return $http({
            method: 'POST',
            url: 'http://localhost:8080/api/recipes',
            data: {
                grain: [{
                            name: this.grainInRecipe,
                            amount: this.grainAmount
                        }],
                hops:  [{
                            name: this.hopsInRecipe,
                            amount: this.hopsAmount,
                            boilTime: this.boilTime
                        }],
                yeast:          this.yeastInRecipe,
                name:           recipeName,
                batchSize:      batchSize,
                efficiency:     efficiency,
                ibu:            IBU,
                og:             OG,
                fg:             FG,
                abv:            ABV,
                srm:            recipeSrm,
                user:           currentUser
            }
        }).then(function(resp) {
            return $http({
                method: 'PUT',
                url:    '/api/users/' + resp.data.user + '/' + resp.data._id
            });
        });
    };

}]);
