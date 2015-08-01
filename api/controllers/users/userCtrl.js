var mongoose    = require('mongoose') ,
    $q          = require('q') ,
    bcrypt      = require( 'bcryptjs' ) ,
    User        = mongoose.model('User', require('../../models/users/userModel.js')) ,
    createHash  = function(password){ return bcrypt.hashSync(password); } ,
    checkHash   = function(password, hash){ return bcrypt.compareSync(password, hash); } ;

// usage of 'q' promises is for auth functionality. see passport.js
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

  retrieveOne: function(req, res){
    var def = $q.defer();
    var query = {};
    if (req.user || req.params.user_id) query = { "_id": req.params.user_id };
    else query = { "email": req.body.email };
    User.findOne(query)
    .exec().then(function(user, err){
      if (err) {
        console.log(err);
        if (req.qpromise) {def.reject(err);}
        else {return res.status(500).json(err);}
      }
      else if (user) {
        if (query._id) return res.status(200).json(user);
        if (checkHash(req.body.password, user.password)) {
          if (req.qpromise) {def.resolve(user);}
          else {return res.status(200).json(user);}
        }
        if (!checkHash(req.body.password, user.password)) {
          if (req.qpromise) {def.reject('Invalid password');}
          else {return res.status(401).send('Invalid password');}
        }
      }
      // if no err or user, respond false to passport strategy to go ahead with user creation
      else { def.resolve(null); }
    });
    return def.promise;
  } ,

  retrieveAll: function(req, res){
    var def = $q.defer();
    User.find({})
    .exec().then(function(users, err){
      if (err) {
        if (req.qpromise) {def.reject(err);}
        else {return res.status(500).json(err);}
      }
      else {
        if (req.qpromise) {def.resolve(users);}
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

  updatePosts: function(req, res){
      User.findById(req.params.user_id, function(err, user){
          if(err) return res.status(500).json(err);
          console.log(111111, user, typeof user.favorites);
          user.favorites.push(new mongoose.Types.ObjectId(req.params.post_id));
          user.save(function(error, newUser){
              console.log(222222, newUser, error);
              if(error) return res.status(500).json(error);
              res.json(newUser);
          });
      });
  }

};
