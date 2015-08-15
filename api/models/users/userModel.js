var mongoose    = require( 'mongoose' ),
    Recipe      = require('../recipes/recipeModel');

var userSchema = {
  firstName:  { type: String, required: true },
  lastName:   { type: String, required: true },
  email:      { type: String, required: true, unique: true },
  password:   { type: String, required: true },
  recipes:    [ { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' } ],
  favorites:  [ { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' } ]
};

module.exports = new mongoose.Schema( userSchema );
