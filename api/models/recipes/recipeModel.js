var mongoose    = require( 'mongoose' ) ;

var recipeSchema = {
    name:           { type: String, required: true },
    grain:          [{ type: mongoose.Schema.Types.ObjectId, ref: 'Grain'}],
    hops:           [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hops' }],
    yeast:          [{ type: mongoose.Schema.Types.ObjectId, ref: 'Yeast' }],
    grainAmount:    [{ type: Number }],
    hopsAmount:     [{ type: Number }],
    boilTime:       [{ type: Number }],
    abv:            { type: Number },
    og:             { type: Number },
    fg:             { type: Number },
    ibu:            { type: Number },
    batchSize:      { type: Number },
    srm:            { type: Number },
    efficiency:     { type: Number },
    user:           { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
};

module.exports = new mongoose.Schema( recipeSchema );
