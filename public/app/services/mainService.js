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
        else if (hopsName) {
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
            });
        }
        else {
            return $http({
            method: 'GET',
            url: 'http://localhost:8081/database/ingredients/yeast/?name=' + yeastName
        });
        }

    };

    // this.srmArr = [];
    //
    // this.avgArray = function(array) {
    //    var s = 0;
    //    for(var i = 0; i < array.length; i++) {
    //        s+= parseFloat(array[i], 10);
    //        console.log(array[i], array.length, s)
    //    }
    //    console.log('AvgArray', s/array.length);
    //    return s/array.length;
    // };
    // this.recipeSrm = this.avgArray(this.srmArr)
    //
    //



});
