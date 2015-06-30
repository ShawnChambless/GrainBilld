var app = angular.module('personalProject', ['ngRoute'])

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
        .otherwise('/database')
});
