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
                        console.log("grain resolve");
                        return mainService.getGrainsInDb().then(function(grains){
                            console.log(grains);
                            return grains;
                        });
                    },
                    hops: function(mainService) {
                        console.log("hops resolve");
                        return mainService.getHopsInDb().then(function(hops){
                            console.log(hops);
                            return hops;
                        });
                    },
                    yeast: function(mainService) {
                        console.log("yeast resolve");
                        return mainService.getYeastInDb().then(function(yeast){
                            console.log(yeast);
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
