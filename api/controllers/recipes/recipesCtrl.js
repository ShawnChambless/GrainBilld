'user strict';
var mongoose = require('mongoose'),
    Recipe   = mongoose.model('Recipe', require('../../models/recipes/recipeModel.js')),
    Grain    = mongoose.model('Grain',  require('../../models/database/grainModel.js')),
    Hops     = mongoose.model('Hops',   require('../../models/database/hopsModel.js')),
    Yeast    = mongoose.model('Yeast',  require('../../models/database/yeastModel.js'));

module.exports = {

    addRecipe: function(req, res) {
        var newRecipe           = new Recipe();
        newRecipe.name          = req.body.name;
        newRecipe.grain         = req.body.grain;
        newRecipe.hops          = req.body.hops;
        newRecipe.yeast         = req.body.yeast;
        newRecipe.abv           = req.body.abv;
        newRecipe.og            = req.body.og;
        newRecipe.fg            = req.body.fg;
        newRecipe.ibu           = req.body.ibu;
        newRecipe.grainAmount   = req.body.grainAmount;
        newRecipe.hopsAmount    = req.body.hopsAmount;
        newRecipe.boilTime      = req.body.boilTime;
        newRecipe.batchSize     = req.body.batchSize;
        newRecipe.efficiency    = req.body.efficiency;
        newRecipe.user          = req.body.user;
        newRecipe.srm           = req.body.srm;
        newRecipe.save(function(err, recipe) {
            console.log(err);
            if(err) return res.status(500).json(err);
            return res.status(200).json(recipe);
        });
    },

    retrieveRecipes: function(req, res) {
        Recipe.find({})
        .populate('grain.name hops.name yeast')
        .exec().then(function(recipes, err) {
            if(err) return res.status(500).json(err);
            return res.status(200).json(recipes);
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
