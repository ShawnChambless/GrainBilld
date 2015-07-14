var app = angular.module('personalProject', ['angular-loading-bar', 'ngRoute', 'angucomplete-alt', 'ngAnimate', 'ngGrid', 'firebase']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/database', {
            templateUrl: 'public/app/views/databaseTmpl.html',
            controller: 'databaseCtrl'
        })
        .when('/NewBatch', {
            templateUrl: 'public/app/views/mainTmpl.html',
            controller: 'mainCtrl',
            resolve:  {

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
});
