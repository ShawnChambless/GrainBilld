var app = angular.module('personalProject');

app.controller('databaseCtrl', function($scope, $http, $q, mainService) {

    $scope.showGrain = false;
    $scope.showHops = false;
    $scope.showYeast = false;
    $scope.showGrainInDb = true;
    $scope.showHopsInDb = false;
    $scope.showYeastInDb = false;
    $scope.showDescription = false;

    $scope.toggleShowDescription = function() {
        $scope.showDescription = !$scope.showDescription;
    };

    $scope.updateGrainSG = function(updateSG, itemId) {
        mainService.updateSG(updateSG, itemId).then(function(resp) {
            $scope.updateSG = '';
            console.log('updated', itemId, updateSG);
        });
    };


    // Shows current list of grains in Database.
    $scope.getGrain = function() {
        var dfd = $q.defer();
        $http({
            method: 'GET',
            url: 'http://localhost:8081/database/ingredients/grain'
        }).then(function(resp) {
            console.log('Got Grain', resp);
            dfd.resolve(resp);
            $scope.grains = resp.data;
        });
    }();
    // Shows current list of hops in Database.
    $scope.getHops = function() {
        var dfd = $q.defer();
        $http({
            method: 'GET',
            url: 'http://localhost:8081/database/ingredients/hops'
        }).then(function(resp) {
            console.log('Got Hops', resp);
            dfd.resolve(resp);
            $scope.hops = resp.data;
        });
    }();

    $scope.getYeast = function() {
        var dfd = $q.defer();
        $http({
            method: 'GET',
            url: 'http://localhost:8081/database/ingredients/yeast'
        }).then(function(resp) {
            console.log('Got Yeast', resp)
            dfd.resolve(resp);
            $scope.yeast = resp.data;
        });
    }();

    //Fairly self explanatory
    $scope.toggleGrain = function() {
        $scope.showGrain = !$scope.showGrain;
        $scope.showHops = false;
        $scope.showYeast = false;
    };
    $scope.toggleHops = function() {
        $scope.showHops = !$scope.showHops;
        $scope.showGrain = false;
        $scope.showYeast = false;
    };
    $scope.toggleYeast = function() {
        $scope.showYeast = !$scope.showYeast;
        $scope.showGrain = false;
        $scope.showHops = false;
    };
    $scope.toggleGrainInDb = function() {
        $scope.showGrainInDb = !$scope.showGrainInDb;
        $scope.showHopsInDb = false;
        $scope.showYeastInDb = false;
    };
    $scope.toggleHopsInDb = function() {
        $scope.showHopsInDb = !$scope.showHopsInDb;
        $scope.showGrainInDb = false;
        $scope.showYeastInDb = false;
    };
    $scope.toggleYeastInDb = function() {
        $scope.showYeastInDb = !$scope.showYeastInDb;
        $scope.showGrainInDb = false;
        $scope.showHopsInDb = false;
    }

    $scope.addGrainToDb = function(grain) {
        return $http({
            method: 'POST',
            url: 'http://localhost:8081/database/ingredients/grain',
            data: grain
        }).then(function(resp) {
            console.log('Added grain to DB', resp);
            $scope.grain = '';
        });
    };

    $scope.addHopsToDb = function(hops) {
        return $http({
            method: 'POST',
            url: 'http://localhost:8081/database/ingredients/hops',
            data: hops
        }).then(function(resp) {
            console.log('Added hops to DB', resp);
            $scope.addHops = '';
        });
    };
    $scope.addYeastToDb = function(yeast) {
        return $http({
            method: 'POST',
            url: 'http://localhost:8081/database/ingredients/yeast',
            data: yeast
        }).then(function(resp) {
            console.log('Added yeast to DB', resp, resp.data);
            $scope.addYeast = '';
        })
    }
});
