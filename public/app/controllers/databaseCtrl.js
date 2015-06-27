var app = angular.module('personalProject');

app.controller('databaseCtrl', function($scope, $http) {

    $scope.addGrainToDb = function(grain) {
        return $http({
            method: 'POST',
            url: 'localhost:8081'
        }, function(resp) {
            console.log(resp);
        })
    }

});
