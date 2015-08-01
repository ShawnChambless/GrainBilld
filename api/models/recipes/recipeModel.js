var mongoose    = require( 'mongoose' ) ;

var recipeSchema = {
    name:   { type: String, required: true },
    grain:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Grain'}],
    hops:   [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hops' }],
    yeast:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Yeast' }],
    abv:    { type: Number },
    og:     { type: Number },
    fg:     { type: Number },
    ibu:    { type: Number }
};

module.exports = new mongoose.Schema( recipeSchema );
