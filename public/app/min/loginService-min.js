angular.module("personalProject").service("loginService",["$firebaseAuth",function(t){this.ref="https://grainbilld.firebaseio.com/",this.firebaseRef=new Firebase(this.ref),this.authObj=t(this.firebaseRef);var o=this.authObj;this.register=function(t,i){this.authObj.$createUser(t,i).then(function(e){console.log(e),o.$authWithPassword(t,i).then(function(t){console.log(t)})})},this.login=function(t,o){this.authObj.$authWithPassword(t,o).then(function(t,o){console.log("logged in",o,t)},function(t){alert(t)})},this.loginWithFacebook=function(){o.$authWithOAuthPopup("facebook").then(function(t,o){o?console.log("Login Failed!",o):console.log("Authenticated successfully with Facebook:",t)})},this.loginWithTwitter=function(){o.$authWithOAuthPopup("twitter").then(function(t,o){o?console.log("Login Failed!",o):console.log("Authenticated successfully with Twitter:",t)})},this.loginWithGoogle=function(){o.$authWithOAuthPopup("google").then(function(t,o){o?console.log("Login Failed!",o):console.log("Authenticated successfully with Google:",t)})}}]);