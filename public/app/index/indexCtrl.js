angular.module('personalProject')
.controller('indexCtrl', ['$scope', 'loginService', function($scope, loginService) {

    $scope.showNewBatch = false;
    $scope.showIngredientInfo = true;
    $scope.showMyRecipes = true
    if(loginService.currentUser() !== 'null') {
        $scope.isLoggedIn = true;
    } else {
        $scope.isLoggedIn = false;
    }


}]);
