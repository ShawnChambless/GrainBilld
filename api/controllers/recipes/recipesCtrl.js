var mongoose = require('mongoose')
    Recipe   = require('../../models/recipes/recipeModel.js');

module.exports = {

    addRecipe: function(req, res) {
        var newRecipe   = new Recipe();
        newRecipe.name  = req.body.name;
        newRecipe.grain = req.body.grain;
        newRecipe.hops  = req.body.hops;
        newRecipe.yeast = req.body.yeast;
        newRecipe.abv   = req.body.abv;
        newRecipe.og    = req.body.og;
        newRecipe.fg    = req.body.fg;
        newRecipe.ibu   = req.body.ibu;
        newRecipe.save(function(err, addedRecipe) {
            if(err) return res.status(500).json(err);
            return res.status(200).json(addedRecipe);
        });
    },

    retrieveRecipes: function(req, res) {
        Recipe.find({})
        .exec().then(function(recipes, err) {
            if(err) return res.status(500).json(err);
            return res.status(200).json(posts);
        });
    },

    editRecipe: function(req, res) {
        Recipe.findByIdAndUpdate(req.params.recipe_id, req.body, {new: true}, function(err, updatedRecipe) {
            if(err) return res.status(500).json(err);
            return res.status(200).json(updatedRecipe);
        });
    },

    removeRecipe: function(req, res) {
        Recipe.findByIdAndRemove(req.params.recipe_id, function(err) {
            if(err) return res.status(500).json(err);
            return res.status(200).send('Recipe', req.params.recipe_id, 'successfully removed');
        });
    }


};
