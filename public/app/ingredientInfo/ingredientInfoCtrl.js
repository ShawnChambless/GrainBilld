angular.module('personalProject')
.controller('ingredientInfoCtrl', ['$scope', 'mainService', 'grain', 'hops', 'yeast', '$location', function($scope, mainService, grains, hops, yeast, $location) {

    $scope.pageTitle = $location.url()


    $scope.grainInDb = grains.data;
    $scope.hopsInDb = hops.data;
    $scope.yeastInDb = yeast.data;

}]);
