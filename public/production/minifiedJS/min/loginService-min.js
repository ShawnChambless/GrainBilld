angular.module("personalProject").service("loginService",["$firebaseAuth","$firebaseObject","$location",function(e,i,t){var s="https://grainbilld.firebaseio.com/",n=new Firebase(s);this.authObj=e(n),this.authData=this.authObj.$getAuth(),this.redirect=function(e){e&&t.url("/MyRecipes")},this.register=function(e,i){this.authObj.$createUser({email:e,password:i}).then(function(s){console.log("Registered:",s),this.login(e,i),t.url("/MyRecipes")}.bind(this))},this.login=function(e,i){this.authObj.$authWithPassword({email:e,password:i}).then(function(e,i){console.log("Logged in:",i,e),t.url("/MyRecipes")})}}]);