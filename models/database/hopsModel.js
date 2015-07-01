var mongoose = require('mongoose');
var hopsSchema = new mongoose.Schema({
    name: {type: String, required: true},
    origin: {type: String},
    type: {type: String, required: true},
    form: {type: String, required: true},
    alphaAcid: {type: Number, required: true},
    cohumulone: {type: Number},
    betaAcid: {type: Number, required: true},
    totalOil: {type: Number, required: true},
    myrcene: {type: Number},
    humulene: {type: Number},
    humuleneCaryophyllene: {type: Number}
});

module.exports = mongoose.model('hops', hopsSchema);
