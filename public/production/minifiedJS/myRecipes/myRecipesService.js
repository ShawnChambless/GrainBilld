angular.module("personalProject").service("recipeService",["$http",function(e){this.user={},this.getRecipes=function(i){return e({method:"GET",url:"http://grainbilld.com/api/recipes/"+i})}}]);