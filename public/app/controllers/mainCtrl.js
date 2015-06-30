var app = angular.module('personalProject');

app.controller('mainCtrl', function($scope, $location) {

    $scope.pageTitle = $location.url()

});
