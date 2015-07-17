var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    facebookId:,
    id: {type: Number},
    recipes: []
});

module.exports = mongoose.model('userSchema', userSchema);
