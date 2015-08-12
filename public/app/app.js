angular.module('personalProject', ['angular-loading-bar', 'ui.router', 'angucomplete-alt', 'ngAnimate'])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    var isLoggedIn = function(loginService, $state) {
        return loginService.getCurrentUser().then(function(user) {
            if(!loginService.currentUser()) $state.go('login');
            return user;
        });
    };

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'production/html/login/loginTmpl.html',
            controller: 'loginCtrl',
            resolve: {
                sessionLogin: function(loginService, $state) {
                    loginService.getCurrentUser().then(function(user) {
                        if(loginService.currentUser()) $state.go('NewBatch');
                        return user;
                    });
                }
            }
        })
        .state('MyRecipes', {
            url: '/MyRecipes',
            templateUrl: 'production/html/myRecipes/myRecipesTmpl.html',
            controller: 'recipeCtrl',
            resolve: {
                currentUser: isLoggedIn,
                // retrieveRecipes: function(recipeService) {
                //     return recipeService.getRecipes().then(function(resp) {
                //         return resp.data;
                //     });
                // }
            }
        })
        .state('IngredientInfo', {
            url: '/IngredientInfo',
            templateUrl: 'production/html/ingredientInfo/ingredientInfoTmpl.html',
            controller: 'ingredientInfoCtrl',
            resolve: {
                currentUser: isLoggedIn,
                // grain: function(mainService) {
                //     return mainService.getGrainsInDb().then(function(grains){
                //         return grains;
                //     });
                // },
                // hops: function(mainService) {
                //     return mainService.getHopsInDb().then(function(hops){
                //         return hops;
                //     });
                // },
                // yeast: function(mainService) {
                //     return mainService.getYeastInDb().then(function(yeast){
                //         return yeast;
                //     });
                // }
            }
        })
        .state('NewBatch', {
            url: '/NewBatch',
            templateUrl: 'production/html/main/mainTmpl.html',
            controller: 'mainCtrl',
            resolve:  {
                currentUser: isLoggedIn,
                    // grain: function(mainService) {
                    //     return mainService.getGrainsInDb().then(function(resp) {
                    //         return resp;
                    //     });
                    // },
                    // hops: function(mainService) {
                    //     return mainService.getHopsInDb().then(function(resp){
                    //         return resp;
                    //     });
                    // },
                    // yeast: function(mainService) {
                    //     return mainService.getYeastInDb().then(function(resp){
                    //         return resp;
                    //     });
                    // }
                }

        })
        .state('database', {
            url: '/database',
            templateUrl: 'production/html/database/databaseTmpl.html',
            controller: 'databaseCtrl',
            resolve: {
                // grain: function(mainService) {
                //     return mainService.getGrainsInDb().then(function(grains){
                //         return grains;
                //     });
                // },
                // hops: function(mainService) {
                //     return mainService.getHopsInDb().then(function(hops){
                //         return hops;
                //     });
                // },
                // yeast: function(mainService) {
                //     return mainService.getYeastInDb().then(function(yeast){
                //         return yeast;
                //     });
                // }
            }
        });

        $urlRouterProvider.otherwise('/login');
}])
.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.latencyThreshold = 10;
    cfpLoadingBarProvider.includeSpinner = false;
}]);
