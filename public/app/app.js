angular.module('personalProject', ['angular-loading-bar', 'ngRoute', 'angucomplete-alt', 'ngAnimate'])
.config(['$routeProvider', function($routeProvider) {


    $routeProvider
        .when('/login', {
            templateUrl: 'production/html/login/loginTmpl.html',
            controller: 'loginCtrl'
        })
        .when('/MyRecipes', {
            templateUrl: 'production/html/myRecipes/myRecipesTmpl.html',
            controller: 'recipeCtrl'
        })
        .when('/IngredientInfo', {
            templateUrl: 'production/html/ingredientInfo/ingredientInfoTmpl.html',
            controller: 'ingredientInfoCtrl',
            resolve: {
                grain: function(mainService) {
                    return mainService.getGrainsInDb().then(function(grains){
                        return grains;
                    });
                },
                hops: function(mainService) {
                    return mainService.getHopsInDb().then(function(hops){
                        return hops;
                    });
                },
                yeast: function(mainService) {
                    return mainService.getYeastInDb().then(function(yeast){
                        return yeast;
                    });
                }
            }
        })
        .when('/NewBatch', {
            templateUrl: 'production/html/main/mainTmpl.html',
            controller: 'mainCtrl',
            resolve:  {
                    grain: function(mainService) {
                        return mainService.getGrainsInDb().then(function(resp) {
                            return resp;
                        });
                    },
                    hops: function(mainService) {
                        return mainService.getHopsInDb().then(function(resp){
                            return resp;
                        });
                    },
                    yeast: function(mainService) {
                        return mainService.getYeastInDb().then(function(resp){
                            return resp;
                        });
                    }
                }

        })
        .when('/database', {
            templateUrl: 'production/html/database/databaseTmpl.html',
            controller: 'databaseCtrl',
            resolve: {
                grain: function(mainService) {
                    return mainService.getGrainsInDb().then(function(grains){
                        return grains;
                    });
                },
                hops: function(mainService) {
                    return mainService.getHopsInDb().then(function(hops){
                        return hops;
                    });
                },
                yeast: function(mainService) {
                    return mainService.getYeastInDb().then(function(yeast){
                        return yeast;
                    });
                }
            }
        })
        .otherwise('/NewBatch');
}])
.config(function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.latencyThreshold = 10;
    cfpLoadingBarProvider.includeSpinner = false;
});
