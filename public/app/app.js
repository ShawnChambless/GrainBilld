var app = angular.module('personalProject', ['angular-loading-bar', 'ngRoute', 'angucomplete-alt', 'ngAnimate', 'ngGrid']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/database', {
            templateUrl: 'public/app/views/databaseTmpl.html',
            controller: 'databaseCtrl'
        })
        .when('/NewBatch', {
            templateUrl: 'public/app/views/mainTmpl.html',
            controller: 'mainCtrl'
        })
        .otherwise('/NewBatch')
});
app.config(function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.latencyThreshold = 10;
});
