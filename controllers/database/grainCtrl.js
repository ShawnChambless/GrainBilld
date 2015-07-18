var Grain = require('../../models/database/grainModel');

module.exports = {
    addGrain: function(req, res) {
        newGrain = new Grain(req.body);
        newGrain.save(function(err, resp) {
            if(err) return res.sendStatus(500, err);
                return res.send(resp);
        });
    },

    getGrain: function(req, res) {
        Grain.find(req.query)
        .exec(function(err, resp) {
            if(err) return res.sendStatus(500);
                return res.send(resp);
        });
    },

    updateGrain: function(req, res) {
        Grain.findByIdAndUpdate(req.params._id, req.body, {new:true}, function(err, resp) {
            if(err) return res.sendStatus(500);
                return res.send(resp);
        });
    }
}
