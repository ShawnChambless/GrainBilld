var app=angular.module("personalProject");app.service("mainService",["$http","$q","$firebaseAuth",function(t,e,a){this.grainInRecipe=[],this.hopsInRecipe=[],this.yeastInRecipe=[],this.rootRef="https://grainbilld.firebaseio.com/",this.ref=new Firebase(this.rootRef),this.authObj=a(this.ref),this.authData=this.authObj.$getAuth(),this.getGrainsInDb=function(e){return t(e?{method:"GET",url:"http://grainbilld.com/database/ingredients/grain/?name="+e}:{method:"GET",url:"http://grainbilld.com/database/ingredients/grain/"})},this.getHopsInDb=function(e){return t(e?{method:"GET",url:"http://grainbilld.com/database/ingredients/hops/?name="+e}:{method:"GET",url:"http://grainbilld.com/database/ingredients/hops/"})},this.getYeastInDb=function(e){return e?t({method:"GET",url:"http://grainbilld.com/database/ingredients/yeast/?name="+e}):t({method:"GET",url:"http://grainbilld.com/database/ingredients/yeast/"}).then(function(t){return t})},this.updateSG=function(e,a){return t({method:"PUT",url:"http://grainbilld.com/database/ingredients/grain/"+a,data:{sg:e}})}}]);