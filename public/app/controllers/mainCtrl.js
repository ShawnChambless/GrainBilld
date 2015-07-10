var app = angular.module('personalProject');

app.controller('mainCtrl', function($scope, $location, $q, $http, mainService) {
    $scope.pageTitle = $location.url()
    $scope.showGrainBox = false;
    $scope.showHopsBox = false;
    $scope.showYeastBox = false;

    var getGrainsInDb = function() {
        mainService.getGrainsInDb().then(function(resp) {
            $scope.grainsInDb = resp.data;
        });
    }();

    var getHopsInDb = function() {
        mainService.getHopsInDb().then(function(resp) {
            $scope.hopsInDb = resp.data;
        });
    }();

    var getYeastInDb = function() {
        mainService.getYeastInDb().then(function(resp) {
            $scope.yeastInDb = resp.data;
        });
    }();

    $scope.showGrainFunction = function() {
        $scope.showGrainBox = !$scope.showGrainBox;
        $scope.showHopsBox = false;
        $scope.showYeastBox = false
    };
    $scope.showHopsFunction = function() {
        $scope.showHopsBox = !$scope.showHopsBox;
        $scope.showGrainBox = false;
        $scope.showYeastBox = false;
    };
    $scope.showYeastFunction = function() {
        $scope.showYeastBox = !$scope.showYeastBox;
        $scope.showGrainBox = false;
        $scope.showHopsBox = false;
    };

    $scope.addToGrainSearchText = function(item) {
        $scope.grainSearchText = item.name;
    };
    $scope.addToHopsSearchText = function(item) {
        $scope.hopsSearchText = item.name;
    };
    $scope.addToYeastSearchText = function(item) {
        $scope.yeastSearchText = item.name;
    };

    // $scope.addGrainToRecipe = function(grainSearchText, grainWeight) {
    //     $scope.grainInRecipe += grainSearchText;
    //     $scope.poundsOfGrainInRecipe += grainWeight;
    //     $scope.grainSearchText = '';
    // }
    //


});
