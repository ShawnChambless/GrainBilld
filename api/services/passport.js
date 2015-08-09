var passport          = require( 'passport' ) ,
    LocalStrategy     = require( 'passport-local' ).Strategy ,
    userCtrl          = require( '../controllers/users/userCtrl.js' ) ,
    mongoose          = require( 'mongoose' ) ,
    User              = mongoose.model('User', require('../models/users/userModel.js')) ,
    bcrypt            = require( 'bcryptjs' ) ,
    createHash        = function(password){ return bcrypt.hashSync(password); } ,
    checkHash         = function(password, hash){ return bcrypt.compareSync(password, hash); } ;

// Passport Session Serialization
passport.serializeUser(function(user, done) {
  done(null, user._id);
});
passport.deserializeUser(function(_id, done) {
  User.findById(_id, function(err, user) {
    done(err, user);
  });
});

// Passport Strategies
passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback : true
}, function(req, email, password, done) {
  // FIND OR CREATE USER BY EMAIL AND PASSWORD
  User.findOne({ "email": email })
  .exec(function(err, user){
    if (err) { return done(err); }
    else if (user) {
      console.log('User already exists with email: ' + email);
      return done(null, 'User already exists with email: ' + email);
    }
    else {
      var newUser = new User();
      newUser.firstName = req.body.firstName;
      newUser.lastName  = req.body.lastName;
      newUser.email     = req.body.email;
      newUser.password  = createHash(req.body.password);
      newUser.save(function(createErr, createdUser) {
        if (createErr) {
          console.log('Error in Saving user: ' + createErr);
          return done(createErr);
          // else {return res.status(500).json(err);}
        }
        console.log('User Registration succesful');
        return done(null, createdUser);
        // else {return res.status(200).json(createdUser);}
      });
    }
  });
}));
passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback : true
}, function(req, email, password, done) {
  User.findOne({ "email": email })
  .exec(function(err, user) {
    if (err) return done(err);
    else if (!user) return done(null, false);
    else if (checkHash(password, user.password)) return done(null, user);
    return done(null, 'Invalid Password');
  });
}));

module.exports = passport;
