angular.module('personalProject')
.controller('mainCtrl', ['$scope', '$timeout', '$location', '$q', '$http', 'mainService', 'grain', 'hops', 'yeast', function($scope, $timeout, $location, $q, $http, mainService, grain, hops, yeast) {
    $scope.pageTitle = $location.url()
    $scope.showHopsBox = false;
    $scope.showYeastBox = false;
    $scope.showGrainInfo = false;
    $scope.showHopsInfo = false;
    $scope.showYeastInfo = false;
    $scope.grainBoxToggle = {rotate: false};
    $scope.hopsBoxToggle = {rotate: false};
    $scope.yeastBoxToggle = {rotate: false};
    $scope.grainInDb = grain.data;
    $scope.hopsInDb = hops.data;
    $scope.yeastInDb = yeast.data;

    var srmArr = [];

    if(!$scope.batchSize) {
        $scope.batchSize = 5;
    }
    if(!$scope.efficiency) {
        $scope.efficiency = 75;
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

    var gpOfGrain;
    var itemToAdd;
    var sgItemToAdd;
    var recipeOG;
    $scope.addGrainToRecipe = function(grainSearchText) {
        if(!$scope.OG) {
            $scope.OG = 1.000;
        }
        mainService.getGrainsInDb(grainSearchText).then(function(resp) {
            mainService.grainInRecipe.push({grain: resp.data[0], amount: $scope.grainWeight});
            $scope.grainSearchText = '';
            $scope.grainInRecipe = mainService.grainInRecipe;
            console.log(mainService.grainInRecipe)
            /*===================================================
            =====================================================
                                Calculate GP
            =======================================================
            =====================================================*/

            if (!itemToAdd) {
                itemToAdd = ((resp.data[0].sg - 1)*1000 * $scope.grainWeight);
                gpOfGrain = itemToAdd;
                console.log('item to add === 0', gpOfGrain, itemToAdd);
            }else {
                gpOfGrain = (itemToAdd + ((parseFloat(resp.data[0].sg) - 1)*1000) * $scope.grainWeight);
                itemToAdd = gpOfGrain;
                console.log('item to add > 0', gpOfGrain, itemToAdd);
            }

            /*===================================================
            =====================================================
                            Calculate SRM/MCU/OG
            =======================================================
            =====================================================*/

            var MCU = (parseFloat((resp.data[0].lovibond * $scope.grainWeight)/$scope.batchSize));
            $scope.recipeSrm = (1.4922*(Math.pow(MCU, 0.6859))).toFixed(1);
            $scope.OG = ((gpOfGrain * .75 / $scope.batchSize)/1000 + 1).toFixed(3);
        });
    };

    var IBUOfGrain;
    var hopsItemToAdd;
    $scope.addHopsToRecipe = function(hopsSearchText) {
        mainService.getHopsInDb(hopsSearchText).then(function(resp) {
            mainService.hopsInRecipe.push({hop: resp.data[0], amount: $scope.hopWeight, boil: $scope.boilTime});
            console.log('Added Hops', mainService.hopsInRecipe);
            $scope.hopsSearchText = '';
            $scope.hopsInRecipe = mainService.hopsInRecipe;

            /*==================================================
            ====================================================
                                Calculate IBU
            ======================================================
            ====================================================*/

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

                var AAU = $scope.hopWeight * (resp.data[0].alphaAcid)

                if (!hopsItemToAdd) {
                    IBUOfGrain = AAU * hopUtilization * 74.89 / $scope.batchSize;
                    hopsItemToAdd = IBUOfGrain;
                    $scope.IBU = IBUOfGrain.toFixed(1);
                }
                else {
                    IBUOfGrain = (AAU * hopUtilization * 74.89 / $scope.batchSize) + hopsItemToAdd;
                    hopsItemToAdd = IBUOfGrain;
                    $scope.IBU = IBUOfGrain.toFixed(1);
                }
        });
    };

    $scope.addYeastToRecipe = function(yeastSearchText) {
        mainService.getYeastInDb(yeastSearchText).then(function(resp) {
            mainService.yeastInRecipe.push(resp.data[0]);
            console.log('Added yeast', resp);
            $scope.yeastSearchText = '';
            $scope.yeastInRecipe = mainService.yeastInRecipe;

            /*===================================================
            =====================================================
                                Calculate FG
            =======================================================
            =====================================================*/

            $scope.FG = ($scope.OG / ($scope.yeastInRecipe[0].maximumAttenuation/100)/1000 + 1).toFixed(3);
            $scope.ABV = ((76.08) * ($scope.OG - $scope.FG) / (1.775 - $scope.OG) * ($scope.FG / 0.794)).toFixed(2)

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

}]);
