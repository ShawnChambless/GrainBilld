var mongoose    = require( 'mongoose' ) ;

var recipeSchema = {
    name:           { type: String, required: true },
    grain:          [{
                        name: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Grain'}],
                        amount: []
                    }],
    hops:           [{
                        name: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hops' }],
                        amount: [],
                        boilTime: [],
                    }],
    yeast:          [{ type: mongoose.Schema.Types.ObjectId, ref: 'Yeast' }],
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
