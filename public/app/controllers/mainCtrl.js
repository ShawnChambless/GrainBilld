var app = angular.module('personalProject');

app.controller('mainCtrl', function($scope, $location, $q, $http, mainService) {

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


    $scope.pageTitle = $location.url()
    $scope.showGrainBox = false;
    $scope.showHopsBox = false;
    $scope.showYeastBox = false;

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

});
