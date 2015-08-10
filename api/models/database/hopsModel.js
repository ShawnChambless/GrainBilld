var mongoose = require('mongoose');
var hopsSchema = {
    name:                   {type: String, required: true},
    origin:                 {type: String, required: true},
    type:                   {type: String, default: 'N/A'},
    alphaAcid:              {type: Number, required: true},
    cohumulone:             {type: Number, default: 0},
    colupulone:             {type: Number, default: 0},
    betaAcid:               {type: Number, default: 0},
    totalOil:               {type: Number, default: 0},
    myrcene:                {type: Number, default: 0},
    humulene:               {type: Number, default: 0},
    humuleneCaryophyllene:  {type: Number, default: 0},
    linalool:               {type: String, default: 0},
    flavor:                 {type: String, default: 'N/A'},
    style:                  {type: String, default: 'N/A'},
    parentage:              {type: String, default: 'N/A'},
    description:            {type: String, default: 'N/A'}
};

module.exports = new mongoose.Schema( hopsSchema );
