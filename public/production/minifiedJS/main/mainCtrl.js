angular.module("personalProject").controller("mainCtrl",["$scope","$timeout","$location","$q","$http","mainService","grain","hops","yeast","$firebaseAuth","$firebaseArray","$firebaseObject",function(o,e,a,i,t,n,s,r,h,c,p,g){o.pageTitle=a.url(),o.showHopsBox=!1,o.showYeastBox=!1,o.showGrainInfo=!1,o.showHopsInfo=!1,o.showYeastInfo=!1,o.grainBoxToggle={rotate:!1},o.hopsBoxToggle={rotate:!1},o.yeastBoxToggle={rotate:!1},o.grainInDb=s.data,o.hopsInDb=r.data,o.yeastInDb=h.data;o.batchSize||(o.batchSize=5),o.efficiency||(o.efficiency=75),o.rotateGrain=function(){o.grainBoxToggle.rotate=!0,e(function(){o.grainBoxToggle.rotate=!1},255,!0)},o.rotateHops=function(){o.hopsBoxToggle.rotate=!0,e(function(){o.hopsBoxToggle.rotate=!1},255,!0)},o.rotateYeast=function(){o.yeastBoxToggle.rotate=!0,e(function(){o.yeastBoxToggle.rotate=!1},255,!0)},o.showGrainFunction=function(){o.showGrainBox=!o.showGrainBox,o.showHopsBox=!1,o.showYeastBox=!1},o.showHopsFunction=function(){o.showHopsBox=!o.showHopsBox,o.showGrainBox=!1,o.showYeastBox=!1},o.showYeastFunction=function(){o.showYeastBox=!o.showYeastBox,o.showGrainBox=!1,o.showHopsBox=!1},o.addToGrainSearchText=function(e){o.grainSearchText=e.name},o.addToHopsSearchText=function(e){o.hopsSearchText=e.name},o.addToYeastSearchText=function(e){o.yeastSearchText=e.name};var f,l;o.addGrainToRecipe=function(e){o.OG||(o.OG=1),n.getGrainsInDb(e).then(function(e){n.grainInRecipe.push({grain:e.data[0],amount:o.grainWeight}),o.grainSearchText="",o.grainInRecipe=n.grainInRecipe,console.log(n.grainInRecipe),l?(f=l+1e3*(parseFloat(e.data[0].sg)-1)*o.grainWeight,l=f,console.log("item to add > 0",f,l)):(l=1e3*(e.data[0].sg-1)*o.grainWeight,f=l,console.log("item to add === 0",f,l));var a=parseFloat(e.data[0].lovibond*o.grainWeight/o.batchSize);o.recipeSrm=(1.4922*Math.pow(a,.6859)).toFixed(1),o.OG=(.75*f/o.batchSize/1e3+1).toFixed(3)})};var d,u;if(o.addHopsToRecipe=function(e){n.getHopsInDb(e).then(function(e){n.hopsInRecipe.push({hop:e.data[0],amount:o.hopWeight,boil:o.boilTime}),console.log("Added Hops",n.hopsInRecipe),o.hopsSearchText="",o.hopsInRecipe=n.hopsInRecipe;var a;0===o.boilTime?a=0:o.boilTime>0&&o.boilTime<=9?a=.05:o.boilTime>9&&o.boilTime<=19?a=.12:o.boilTime>19&&o.boilTime<=29?a=.15:o.boilTime>29&&o.boilTime<=44?a=.19:o.boilTime>44&&o.boilTime<=59?a=.22:o.boilTime>59&&o.boilTime<=74?a=.24:o.boilTime>74&&(a=.27);var i=o.hopWeight*e.data[0].alphaAcid;u?(d=i*a*74.89/o.batchSize+u,u=d,o.IBU=d.toFixed(1)):(d=i*a*74.89/o.batchSize,u=d,o.IBU=d.toFixed(1))})},o.addYeastToRecipe=function(e){n.getYeastInDb(e).then(function(e){n.yeastInRecipe.push(e.data[0]),console.log("Added yeast",e),o.yeastSearchText="",o.yeastInRecipe=n.yeastInRecipe,o.FG=(o.OG/(o.yeastInRecipe[0].maximumAttenuation/100)/1e3+1).toFixed(3),o.ABV=(76.08*(o.OG-o.FG)/(1.775-o.OG)*(o.FG/.794)).toFixed(2)})},o.toggleGrainInfo=function(){o.showGrainInfo=!o.showGrainInfo,o.showHopsInfo=!1,o.showYeastInfo=!1},o.toggleHopsInfo=function(){o.showHopsInfo=!o.showHopsInfo,o.showGrainInfo=!1,o.showYeastInfo=!1},o.toggleYeastInfo=function(){o.showYeastInfo=!o.showYeastInfo,o.showGrainInfo=!1,o.showHopsInfo=!1},n.authData){var I=n.authData,T=new Firebase(n.rootRef+"users/"+I.uid+"/recipes"),x=p(T);o.recipe=x,o.saveRecipe=function(e){x.$add({grain:o.grainInRecipe,hops:o.hopsInRecipe,yeast:o.yeastInRecipe,srm:o.recipeSrm,ibu:o.IBU,og:o.OG,fg:o.FG,abv:o.ABV})}}}]);