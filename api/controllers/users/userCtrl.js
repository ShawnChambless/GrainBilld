var mongoose    = require('mongoose') ,
    User        = mongoose.model('User', require('../../models/users/userModel.js')) ;

module.exports = {

  create: function(req, res){
    var newUser = new User();
    newUser.firstName = req.body.firstName;
    newUser.lastName  = req.body.lastName;
    newUser.email     = req.body.email;
    newUser.password  = createHash(req.body.password);
    newUser.save(function(err, createdUser) {
      if (err) return res.status(500).json(err);
      return res.status(200).json(createdUser);
    });
  } ,

  retrieveOne: function(req, res){
    var query = {};
    if (req.user || req.params.user_id) query = { "_id": req.params.user_id };
    else query = { "email": req.body.email };
    User.findOne(query)
    .populate('favorites watchLater bounties posts')
    .exec().then(function(user, err){
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      else if (user) {
        if (query._id) return res.status(200).json(user);
        if (checkHash(req.body.password, user.password)) {
          return res.status(200).json(user);
        }
        if (!checkHash(req.body.password, user.password)) {
          return res.status(401).send('Invalid password');
        }
      }
    });
  } ,

  getCurrentUser: function(req, res){
    return res.status(200).json(req.user);
  },

  update: function(req, res){
    User.findByIdAndUpdate(req.params.user_id, req.body, {new: true}, function(err, updatedUser){
      if (err) return res.status(500).json(err);
      return res.status(200).json(updatedUser);
    });
  } ,

  updateRecipes: function(req, res){
      User.findById(req.params.user_id, function(err, user){
          if(err) return res.status(500).json(err);
          user.posts.push(new mongoose.Types.ObjectId(req.params.post_id));
          user.save(function(error, updatedUser){
              if(error) return res.status(500).json(error);
              return res.json(updatedUser);
          });
      });
  },

  updateFavorites: function(req, res){
      User.findById(req.params.user_id, function(err, user){
          if(err) return res.status(500).json(err);
          user.favorites.push(new mongoose.Types.ObjectId(req.params.post_id));
          user.save(function(error, updatedUser){
              if(error) return res.status(500).json(error);
              return res.json(updatedUser);
          });
      });
  },

  removeFavorite: function(req, res){
      User.findById(req.params.user_id, function(err, user){
          if(err) return res.status(500).json(err);
          user.favorites.remove({'_id': req.params.post_id}, function(err){
              if(error) return res.status(500).json(error);
          });
      });
  },

  remove: function(req, res){
    User.findByIdAndRemove(req.params.user_id, function(err){
      if (err) return res.status(500).json(err);
      return res.status(200).send('User ' + req.params.user_id + ' has been deleted');
    });
  }

};
