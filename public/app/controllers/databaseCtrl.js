var app = angular.module('personalProject');

app.controller('databaseCtrl', function($scope, $http, $q) {

    $scope.addGrainToDb = function(grain) {
        return $http({
            method: 'POST',
            url: 'http://localhost:8081/database/ingredients/grain',
            data: grain
        }).then(function(resp) {
            console.log(resp);
            $scope.grain = '';
        });
    };
    $scope.addHopsToDb = function(hops) {
        return $http({
            method: 'POST',
            url: 'http://localhost:8081/database/ingredients/hops',
            data: hops
        }, function(resp) {
            console.log(resp);
        });
    };

    $scope.getGrain = function() {
        var dfd = $q.defer();
        $http({
            method: 'GET',
            url: 'http://localhost:8081/database/ingredients/grain'
        }).then(function(resp) {
            dfd.resolve(resp);
            $scope.grains = resp.data;
        });
    }();
});
