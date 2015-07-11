var app = angular.module('personalProject');

app.controller('mainCtrl', function($scope, $location, $q, $http, mainService) {
    $scope.pageTitle = $location.url()
    $scope.showGrainBox = false;
    $scope.showHopsBox = false;
    $scope.showYeastBox = false;
    $scope.showGrainInfo = false;
    $scope.showHopsInfo = false;
    $scope.showYeastInfo = false;
    var srmArr = [];


    var getGrainsInDb = function() {
        mainService.getGrainsInDb().then(function(resp) {
            $scope.grainsInDb = resp.data;
            console.log('Got Grain In DB',resp)
        });
    }();

    var getHopsInDb = function() {
        mainService.getHopsInDb().then(function(resp) {
            $scope.hopsInDb = resp.data;
            console.log('Got Hops in DB', resp)
        });
    }();

    var getYeastInDb = function() {
        mainService.getYeastInDb().then(function(resp) {
            $scope.yeastInDb = resp.data;
            console.log('Got Yeast in DB',resp)
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

    $scope.grainInRecipe = [];
    $scope.hopsInRecipe = [];
    $scope.yeastInRecipe = [];


    $scope.addGrainToRecipe = function(grainSearchText) {
        mainService.getGrainsInDb(grainSearchText).then(function(resp) {
            $scope.grainInRecipe.push(resp.data[0]);
            srmArr.push(resp.data[0].lovibond);
            console.log('Added Grain', resp);
            $scope.grainSearchText = '';
        });
    };

    $scope.addHopsToRecipe = function(hopsSearchText) {
        mainService.getHopsInDb(hopsSearchText).then(function(resp) {
            $scope.hopsInRecipe.push(resp.data[0]);
            console.log('Added Hops', resp);
            $scope.hopsSearchText = '';
        });
    };

    $scope.addYeastToRecipe = function(yeastSearchText) {
        mainService.getYeastInDb(yeastSearchText).then(function(resp) {
            $scope.yeastInRecipe.push(resp.data[0]);
            console.log('Added yeast', resp);
            $scope.yeastSearchText = '';
        });
    };


    $scope.toggleGrainInfo = function() {
        $scope.showGrainInfo = !$scope.showGrainInfo;
        $scope.showHopsInfo = false;
        $scope.showYeastInfo = false;
    };
    $scope.toggleHopsInfo = function() {
        $scope.showHopsInfo = !$scope.showHopsInfo;
        $scope.showGrainInfo = false;
        $scope.showYeastInfo = false;
    };
    $scope.toggleYeastInfo = function() {
        $scope.showYeastInfo = !$scope.showYeastInfo;
        $scope.showGrainInfo = false;
        $scope.showHopsInfo = false;
    };

    function avgArray(array) {
       var s = 0;
       for (var i = 0; i < array.length; i++) {
           s+= parseFloat(array[i], 10);
           console.log(array[i])
       }
       console.log(s)
       return s/array.length;
    }

    $scope.getSrm = function() {
        $scope.recipeSrm = avgArray(srmArr);
    };
        // $scope.grainInRecipe.push({name: grainSearchText});
        //
        // console.log($scope.grainInRecipe);



});
