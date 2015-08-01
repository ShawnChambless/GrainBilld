var app = angular.module('personalProject', ['angular-loading-bar', 'ngRoute', 'angucomplete-alt', 'ngAnimate', 'firebase']);

app.config(function($routeProvider) {


    $routeProvider
        .when('/login', {
            templateUrl: 'public/production/html/login/loginTmpl.html',
            controller: 'loginCtrl'
        })
        .when('/MyRecipes', {
            templateUrl: 'public/production/html/myRecipes/myRecipesTmpl.html',
            controller: 'recipeCtrl'
        })
        .when('/IngredientInfo', {
            templateUrl: 'public/app/ingredientInfo/ingredientInfoTmpl.html',
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
            templateUrl: 'public/production/html/main/mainTmpl.html',
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
            templateUrl: 'public/production/html/database/databaseTmpl.html',
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
        .otherwise('/NewBatch')
});
app.config(function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.latencyThreshold = 10;
    cfpLoadingBarProvider.includeSpinner = false;
});
