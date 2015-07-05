var mongoose = require('mongoose');

var yeastSchema = new mongoose.Schema({
    name: {type: String, required: true},
    format: {type: String, required: true},
    type: {type: String, default: 'General purpose'},
    origin: {type: String},
    minimumTemperature: {type: Number, required: true},
    maximumTemperature: {type: Number, required: true},
    flocculation: {type: Number},
    minimumAttenuation: {type: Number},
    maximumAttenuation: {type: Number}
});

module.exports = mongoose.model('yeast', yeastSchema);
