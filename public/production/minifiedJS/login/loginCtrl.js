var app=angular.module("personalProject").controller("loginCtrl",["$scope","$http","loginService",function(n,o,r){n.register=function(n,o,e,i){r.register(n,o,e,i)},n.login=function(n,o){r.login(n,o)}}]);