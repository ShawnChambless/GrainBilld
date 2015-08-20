angular.module('personalProject')
.controller('mainCtrl', ['$scope', '$timeout', '$location', '$q', '$http', 'mainService', 'grain', 'hops', 'yeast', function($scope, $timeout, $location, $q, $http, mainService, grain, hops, yeast) {
    $scope.pageTitle = $location.url();
    $scope.showHopsBox      = false;
    $scope.showYeastBox     = false;
    $scope.showGrainInfo    = false;
    $scope.showHopsInfo     = false;
    $scope.showYeastInfo    = false;
    $scope.grainBoxToggle   = {rotate: false};
    $scope.hopsBoxToggle    = {rotate: false};
    $scope.yeastBoxToggle   = {rotate: false};

    $scope.grainInDb    = grain.data;
    $scope.hopsInDb     = hops.data;
    $scope.yeastInDb    = yeast.data;

    $scope.grainInRecipe    = [];
    $scope.hopsInRecipe     = [];
    $scope.yeastInRecipe    = [];

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
        $scope.showYeastBox = false;
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
            mainService.grainInRecipe.push(resp.data[0]._id);
            mainService.grainAmount.push($scope.grainWeight);
            $scope.grainSearchText = '';
            $scope.grainInRecipe.push({grain: resp.data[0], amount: $scope.grainWeight});
            /*===================================================
            =====================================================
                                Calculate GP
            =======================================================
            =====================================================*/

            if (!itemToAdd) {
                itemToAdd = ((resp.data[0].sg - 1)*1000 * $scope.grainWeight);
                gpOfGrain = itemToAdd;
            } else {
                gpOfGrain = (itemToAdd + ((parseFloat(resp.data[0].sg) - 1)*1000) * $scope.grainWeight);
                itemToAdd = gpOfGrain;
            }

            /*===================================================
            =====================================================
                            Calculate SRM/MCU/OG
            =======================================================
            =====================================================*/

            var MCU = (parseFloat((resp.data[0].lovibond * $scope.grainWeight)/$scope.batchSize));
            $scope.recipeSrm = (1.4922*(Math.pow(MCU, 0.6859))).toFixed(1);
            $scope.OG = ((gpOfGrain * 0.75 / $scope.batchSize)/1000 + 1).toFixed(3);
        });
    };

    var IBUOfGrain;
    var hopsItemToAdd;
    $scope.addHopsToRecipe = function(hopsSearchText) {
        mainService.getHopsInDb(hopsSearchText).then(function(resp) {
            mainService.hopsInRecipe.push(resp.data[0]._id);
            mainService.hopsAmount.push($scope.hopWeight);
            mainService.boilTime.push($scope.boilTime);
            $scope.hopsSearchText = '';
            $scope.hopsInRecipe.push({hop: resp.data[0], amount: $scope.hopWeight, boil: $scope.boilTime});

            /*==================================================
            ====================================================
                                Calculate IBU
            ======================================================
            ====================================================*/

            var hopUtilization;
                if($scope.boilTime === 0) {
                    hopUtilization = 0;
                } else if ($scope.boilTime > 0 && $scope.boilTime <= 9) {
                    hopUtilization = 0.05;
                } else if ($scope.boilTime > 9 && $scope.boilTime <= 19) {
                    hopUtilization = 0.12;
                } else if ($scope.boilTime > 19 && $scope.boilTime <= 29) {
                    hopUtilization = 0.15;
                } else if ($scope.boilTime > 29 && $scope.boilTime <= 44) {
                    hopUtilization = 0.19;
                } else if ($scope.boilTime > 44 && $scope.boilTime <= 59) {
                    hopUtilization = 0.22;
                } else if ($scope.boilTime > 59 && $scope.boilTime <= 74) {
                    hopUtilization = 0.24;
                } else if ($scope.boilTime > 74) {
                    hopUtilization = 0.27;
                }

                var AAU = $scope.hopWeight * (resp.data[0].alphaAcid);

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
            mainService.yeastInRecipe.push(resp.data[0]._id);
            $scope.yeastSearchText = '';
            $scope.yeastInRecipe.push(resp.data[0]);

            /*===================================================
            =====================================================
                                Calculate FG
            =======================================================
            =====================================================*/
            var attenuation = ($scope.yeastInRecipe[0].maximumAttenuation + $scope.yeastInRecipe[0].minimumAttenuation)/2;
            $scope.FG = (1+($scope.OG / (attenuation))).toFixed(3);
            $scope.ABV = ((76.08) * ($scope.OG - $scope.FG) / (1.775 - $scope.OG) * ($scope.FG / 0.794)).toFixed(2);

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

    $scope.saveRecipe = function(grainInRecipe, hopsInRecipe, yeastInRecipe, recipeName, batchSize, efficiency, IBU, OG, FG, ABV, recipeSrm) {
        // for (var prop in $scope.grainInRecipe.data) {
        //     for(var val in prop) {
        //         grain = val._id;
        //     }
        // }
        // for (var prop2 in $scope.hopsInRecipe.data) {
        //     for(var val2 in prop) {
        //         hops = val2._id;
        //     }
        // }
        // for (var prop3 in $scope.yeastInRecipe.data) {
        //     for(var val3 in prop) {
        //         yeast = val3._id;
        //     }
        // }
        mainService.saveRecipe(grain, hops, yeast, $scope.recipeName, $scope.batchSize, $scope.efficiency, $scope.IBU, $scope.OG, $scope.FG, $scope.ABV, $scope.recipeSrm, currentUser).then(function(resp) {
        });
    };


}]);
