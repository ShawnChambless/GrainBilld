var app=angular.module("personalProject",["angular-loading-bar","ngRoute","angucomplete-alt","ngAnimate","firebase"]);app.config(function(n){n.when("/login",{templateUrl:"public/app/login/loginTmpl.html",controller:"loginCtrl"}).when("/IngredientInfo",{templateUrl:"public/app/ingredientInfo/ingredientInfoTmpl.html",controller:"ingredientInfoCtrl",resolve:{grain:function(n){return n.getGrainsInDb().then(function(n){return n})},hops:function(n){return n.getHopsInDb().then(function(n){return n})},yeast:function(n){return n.getYeastInDb().then(function(n){return n})}}}).when("/NewBatch",{templateUrl:"public/app/main/mainTmpl.html",controller:"mainCtrl",resolve:{grain:function(n){return n.getGrainsInDb().then(function(n){return n})},hops:function(n){return n.getHopsInDb().then(function(n){return n})},yeast:function(n){return n.getYeastInDb().then(function(n){return n})}}}).when("/database",{templateUrl:"public/app/database/databaseTmpl.html",controller:"databaseCtrl",resolve:{grain:function(n){return n.getGrainsInDb().then(function(n){return n})},hops:function(n){return n.getHopsInDb().then(function(n){return n})},yeast:function(n){return n.getYeastInDb().then(function(n){return n})}}}).otherwise("/NewBatch")}),app.config(function(n){n.latencyThreshold=10,n.includeSpinner=!1});