var app=angular.module("personalProject").controller("loginCtrl",["$scope","$http","loginService",function(e,r,n){e.authData=n.authData,e.user="",e.newUser="",e.login=function(r,a){n.login(e.user.email,e.user.password)},e.register=function(r,a){n.register(e.newUser.email,e.newUser.password)}}]);