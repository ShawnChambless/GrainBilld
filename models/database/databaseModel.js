var mongoose = require('mongoose');

var grainSchema = new mongoose.Schema({
    name: {type: String, minlength: 1, required: true},
    type: {type: String, minlength: 1, required: true},
    origin: {type: String},
    alphaAmylase: {type: String, default: 0},
    diastaticPower: {type: String},
    lovibond: {type: String, required: true},
    extractPercent: {type: String},
    solubleProtein: {type: String},
    totalProtein: {type: String},
    usage: {type: String},
    moisture: {type: String},
    description: {type: String}
});

module.export = mongoose.model('grainSchema', grainSchema)
