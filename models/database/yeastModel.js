var mongoose = require('mongoose');

var yeastSchema = new mongoose.Schema({
    name: {type: String, required: true},
    brand: {type: String, required: true},
    format: {type: String, required: true},
    yeastType: {type: String, default: 'General purpose'},
    origin: {type: String},
    minimumTemperature: {type: Number},
    maximumTemperature: {type: Number},
    flocculation: {type: Number},
    minimumAttenuation: {type: Number},
    maximumAttenuation: {type: Number}
});

module.exports = mongoose.model('yeast', yeastSchema);
