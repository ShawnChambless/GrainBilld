var app=angular.module("personalProject");app.controller("databaseCtrl",["$scope","$http","$q","mainService","grain","hops","yeast",function(t,a,n,o,e,d,s){t.grainsInDb=e.data,t.hopsInDb=d.data,t.yeastInDb=s.data,t.updateGrainSG=function(a,n){o.updateSG(a,n).then(function(o){t.updateSG="",console.log("updated",n,a)})},t.addGrainToDb=function(n){return a({method:"POST",url:"http://grainbilld.com/database/ingredients/grain",data:n}).then(function(a){console.log("Added grain to DB",a),t.grain=""})},t.addHopsToDb=function(n){return a({method:"POST",url:"http://grainbilld.com/database/ingredients/hops",data:n}).then(function(a){console.log("Added hops to DB",a),t.addHops=""})},t.addYeastToDb=function(n){return a({method:"POST",url:"http://grainbilld.com/database/ingredients/yeast",data:n}).then(function(a){console.log("Added yeast to DB",a,a.data),t.addYeast=""})}}]);