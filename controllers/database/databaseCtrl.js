var Grain = require('../../models/database/databaseModel');

module.exports = {
    addGrain: function(req, res) {
        newGrain = new Grain(req.body);
        newGrain.save(function(err, resp) {
            if(err) return res.sendStatus(500);
                return res.send(resp);
        });
    },

    getGrain: function(req, res) {
        Grain.find(req.query)
        .exec(function(err, resp) {
            if(err) return res.sendStatus(500);
                return res.send(resp);
        });
    }
}
