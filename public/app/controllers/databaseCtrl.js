var app = angular.module('personalProject');

app.controller('databaseCtrl', function($scope, $http) {

    $scope.addGrainToDb = function(grain) {
        return $http({
            method: 'POST',
            url: 'http://localhost:8081/database',
            data: grain
        }, function(resp) {
            console.log(resp);
        })
    }

});
