var Hops = require('../../models/database/hopsModel');

module.exports = {
    addHops: function(req, res) {
        newHops = new Hops(req.body);
        newHops.save(function(err, resp) {
            if(err) return res.sendStatus(500);
                return res.send(resp);
        });
    },

    getHops: function(req, res) {
        Hops.find(req.query)
        .exec(function(err, resp) {
            if(err) return res.sendStatus(500);
                return res.send(resp);
        });
    }
}
