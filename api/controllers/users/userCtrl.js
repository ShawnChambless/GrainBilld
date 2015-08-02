var mongoose    = require('mongoose') ,
    $q          = require('q') ,
    bcrypt      = require( 'bcryptjs' ) ,
    User        = mongoose.model('User', require('../../models/users/userModel.js')) ,
    createHash  = function(password){ return bcrypt.hashSync(password); } ,
    checkHash   = function(password, hash){ return bcrypt.compareSync(password, hash); } ;

module.exports = {

  create: function(req, res){
    var def = $q.defer();
    var newUser = new User();
    newUser.firstName = req.body.firstName;
    newUser.lastName  = req.body.lastName;
    newUser.email     = req.body.email;
    newUser.password  = createHash(req.body.password);
    newUser.save(function(err, createdUser) {
      if (err) {
        console.log(err);
        if (req.qpromise) {def.reject(err);}
        else {return res.status(500).json(err);}
      }
      else {
        if (req.qpromise) {def.resolve(createdUser);}
        else {return res.status(200).json(createdUser);}
      }
    });
    return def.promise;
  } ,

  getCurrentUser: function(req, res){
    console.log(req.session, req.user);
    return req.user;
  },

  update: function(req, res){
    User.findByIdAndUpdate(req.params.user_id, req.body, {new: true}, function(err, updatedUser){
      if (err) return res.status(500).json(err);
      return res.status(200).json(updatedUser);
    });
  } ,

  remove: function(req, res){
    User.findByIdAndRemove(req.params.user_id, function(err){
      if (err) return res.status(500).json(err);
      return res.status(200).send('User ' + req.params.user_id + ' has been deleted');
    });
  },

};
