var User = require('../../models/users/userModel');

module.exports = {
    addUser: function(req, res) {
        newUser = new User(req.body);
        newUser.save(function(err, resp) {
            if(err) return res.sendStatus(500);
                return res.send(resp);
        });
    }
};
