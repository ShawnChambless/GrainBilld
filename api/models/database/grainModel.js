var mongoose = require('mongoose');

var grainSchema = {
    name:           {type: String, minlength: 1, required: true},
    type:           {type: String, minlength: 1, required: true},
    origin:         {type: String, default: 'N/A'},
    alphaAmylase:   {type: String, default: 0},
    diastaticPower: {type: String, default: 0},
    lovibond:       {type: String, default: 'N/A'},
    extractPercent: {type: String, default: 0},
    solubleProtein: {type: String, default: 0},
    totalProtein:   {type: String, default: 0},
    usage:          {type: String, default: 0},
    moisture:       {type: String, default: 0},
    sg:             {type: Number, default: 0},
    description:    {type: String, default: 'N/A'}
};

module.exports = new mongoose.Schema( grainSchema );
