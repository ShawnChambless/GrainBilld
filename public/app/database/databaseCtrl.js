var app = angular.module('personalProject');

app.controller('databaseCtrl',['$scope', '$http', '$q', 'mainService', 'grain', 'hops', 'yeast', '$firebaseAuth', '$firebaseArray', function($scope, $http, $q, mainService, grain, hops, yeast, $firebaseAuth, $firebaseArray) {

    $scope.grainsInDb = grain.data;
    $scope.hopsInDb = hops.data;
    $scope.yeastInDb = yeast.data;

    var rootRef = 'https://grainbilld.firebaseio.com/';
    var ref = new Firebase(rootRef);
    var authObj = $firebaseAuth(ref);
    var authData = authObj.$getAuth();

    $scope.updateGrainSG = function(updateSG, itemId) {
        mainService.updateSG(updateSG, itemId).then(function(resp) {
            $scope.updateSG = '';
            console.log('updated', itemId, updateSG);
        });
    };

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
        });
    };

    // $scope.sendToFirebase = function(yeastInDb) {
    //     var ingredientRef = new Firebase(rootRef + 'ingredients/yeast');
    //     var newIngredient = $firebaseArray(ingredientRef);
    //     newIngredient.$add(yeastInDb);
    // };
}]);
