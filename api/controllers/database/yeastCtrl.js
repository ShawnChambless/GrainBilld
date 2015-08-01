var Yeast = require('../../models/database/yeastModel');

module.exports = {
    addYeast: function(req, res) {
        newYeast = new Yeast(req.body);
        newYeast.save(function(err, resp) {
            if(err) return res.sendStatus(500);
                return res.send(resp);
        });
    },

    getYeast: function(req, res) {
        Yeast.find(req.query)
        .exec(function(err, resp) {
            if(err) return res.sendStatus(500);
                return res.send(resp);
        });
    }
};
