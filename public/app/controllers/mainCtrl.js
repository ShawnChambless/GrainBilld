var app = angular.module('personalProject');

app.controller('mainCtrl', function($scope, $timeout, $location, $q, $http, mainService) {
    $scope.pageTitle = $location.url()
    $scope.showHopsBox = false;
    $scope.showYeastBox = false;
    $scope.showGrainInfo = false;
    $scope.showHopsInfo = false;
    $scope.showYeastInfo = false;
    $scope.grainBoxToggle = {rotate: false};
    $scope.hopsBoxToggle = {rotate: false};
    $scope.yeastBoxToggle = {rotate: false};
    var srmArr = [];

    if(!$scope.batchSize) {
        $scope.batchSize = 5;
    }

    $scope.rotateGrain = function() {
        $scope.grainBoxToggle.rotate=true;
        $timeout(function() {
            $scope.grainBoxToggle.rotate = false;
        }, 255, true);

    };

    $scope.rotateHops = function() {
        $scope.hopsBoxToggle.rotate = true;
        $timeout(function() {
            $scope.hopsBoxToggle.rotate = false;
        }, 255, true);
    };
    $scope.rotateYeast = function() {
        $scope.yeastBoxToggle.rotate = true;
        $timeout(function() {
            $scope.yeastBoxToggle.rotate = false;
        }, 255, true);
    };

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


    $scope.addGrainToRecipe = function(grainSearchText) {
        mainService.getGrainsInDb(grainSearchText).then(function(resp) {
            mainService.grainInRecipe.push(resp.data[0]);
            $scope.grainSearchText = '';
            $scope.grainInRecipe = mainService.grainInRecipe;
            var MCU = (parseFloat((resp.data[0].lovibond * $scope.grainWeight)/$scope.batchSize));
            $scope.getSrm = function() {
                $scope.recipeSrm = .4922*(Math.pow(MCU, 0.6859));
            };

        });
    };

    $scope.addHopsToRecipe = function(hopsSearchText) {
        mainService.getHopsInDb(hopsSearchText).then(function(resp) {
            mainService.hopsInRecipe.push(resp.data[0]);
            console.log('Added Hops', resp);
            $scope.hopsSearchText = '';
            $scope.hopsInRecipe = mainService.hopsInRecipe;
            $scope.getRecipeIBU = function() {
                var hopUtilization;
                if($scope.boilTime === 0) {
                    hopUtilization = 0;
                } else if ($scope.boilTime > 0 && $scope.boilTime <= 9) {
                    hopUtilization = .05;
                } else if ($scope.boilTime > 9 && $scope.boilTime <= 19) {
                    hopUtilization = .12;
                } else if ($scope.boilTime > 19 && $scope.boilTime <= 29) {
                    hopUtilization = .15;
                } else if ($scope.boilTime > 29 && $scope.boilTime <= 44) {
                    hopUtilization = .19;
                } else if ($scope.boilTime > 44 && $scope.boilTime <= 59) {
                    hopUtilization = .22;
                } else if ($scope.boilTime > 59 && $scope.boilTime <= 74) {
                    hopUtilization = .24;
                } else if ($scope.boilTime > 74) {
                    hopUtilization = .27;
                }
             $scope.recipeIBU = ($scope.hopWeight * hopUtilization * (resp.data[0].alphaAcid / 100) * 7489)/($scope.batchSize * (1+($scope.batchSize - 1.050)/0.2));
        };
        });
    };

    $scope.addYeastToRecipe = function(yeastSearchText) {
        mainService.getYeastInDb(yeastSearchText).then(function(resp) {
            mainService.yeastInRecipe.push(resp.data[0]);
            console.log('Added yeast', resp);
            $scope.yeastSearchText = '';
            $scope.yeastInRecipe = mainService.yeastInRecipe;
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



});
