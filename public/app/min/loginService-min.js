angular.module("personalProject").service("loginService",["$firebaseAuth","$firebaseObject",function(e,i){var n="https://grainbilld.firebaseio.com/",o=new Firebase(n),s=e(o);this.register=function(e,i){s.$createUser({email:e,password:i}).then(function(n){console.log("Registered:",n),this.login(e,i)}.bind(this))},this.login=function(e,i){s.$authWithPassword({email:e,password:i}).then(function(e,i){console.log("Logged in:",i,e)})}}]);