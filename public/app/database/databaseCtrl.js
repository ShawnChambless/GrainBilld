var app = angular.module('personalProject');

app.controller('databaseCtrl',['$scope', '$http', '$q', 'mainService', 'grain', 'hops', 'yeast', function($scope, $http, $q, mainService, grain, hops, yeast) {

    $scope.grainsInDb = grain.data;
    $scope.hopsInDb = hops.data;
    $scope.yeastInDb = yeast.data;

    $scope.updateGrainSG = function(updateSG, itemId) {
        mainService.updateSG(updateSG, itemId).then(function(resp) {
            $scope.updateSG = '';
        });
    };

    $scope.addGrainToDb = function(grain) {
        return $http({
            method: 'POST',
            url: 'http://grainbilld.com/database/ingredients/grain',
            data: grain
        }).then(function(resp) {
            $scope.grain = '';
        });
    };

    $scope.addHopsToDb = function(hops) {
        return $http({
            method: 'POST',
            url: 'http://grainbilld.com/database/ingredients/hops',
            data: hops
        }).then(function(resp) {
            $scope.addHops = '';
        });
    };
    $scope.addYeastToDb = function(yeast) {
        return $http({
            method: 'POST',
            url: 'http://grainbilld.com/database/ingredients/yeast',
            data: yeast
        }).then(function(resp) {
            $scope.addYeast = '';
        });
    };

}]);
