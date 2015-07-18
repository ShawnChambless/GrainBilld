var express = require('express'),
    app = express(),
    session = require('express-session'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    TwitterStrategy = require('passport-twitter').Strategy,
    GoogleStrategy = require('passport-google-oauth2').Strategy,
    User = require('./models/users/userModel'),
    UserCtrl = require('./controllers/users/userCtrl'),
    port = 8081,
    bodyParser = require('body-parser'),
    grainCtrl = require('./controllers/database/grainCtrl'),
    hopsCtrl = require('./controllers/database/hopsCtrl'),
    yeastCtrl = require('./controllers/database/yeastCtrl'),
    LocalStrategy = require('passport-local').Strategy
    cors = require('cors');

app.use(bodyParser.json());
app.use(cors());
//app.use(express.static(__dirname + '/public/app/'));
app.use(passport.initialize());
app.use(passport.session());

var isAuthed = function(req, res, next) {
  if (!req.isAuthenticated()) return res.sendStatus(401);
  return next();
};

app.use(session({
    secret: 'gibberish',
    resave: false,
    saveUninitialized: false
}));

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
  session: true
}, function(email, password, done) {
  User.findOne({ email: email })
  .exec(function(err, user) {
    if(err) done(err);
    if(!user) return done(null, false);
    if(user.verifyPassword(password)) return done(null, user);
    return done(null, false);
  });
}));

passport.use(new FacebookStrategy({
    clientID: '382558321950904',
    clientSecret: 'a09fff493ed129f076a75d5f85d33562',
    callbackURL: "http://localhost:5757/",
    enableProof: false
  },
    function(accessToken, refreshToken, profile, done) {
        console.log('anything plz')
        done(null, user)
    }));


// passport.use(new TwitterStrategy({
//     consumerKey: 'mW3ZmqpDwG6gqnk4vxyi5iOrF',
//     consumerSecret: 'nIGTbzj1Qdu42S7petJ5NID3HtDNyYe5m7ra5TTLaIT9dYRQpk',
//     callbackURL: 'http://localhost:8081/auth/twitter/callback'
// }, function(token, tokenSecret, profile, done) {
//     // User.findOrCreate({twitterId: profile.id}, function(err, user) {
//     //     if(err) {return done(err);}
//     // console.log('lsakdfs')
//     //     done(null);
//     // });
//     done(null, profile)
// }));
//
// passport.use(new GoogleStrategy({
//     clientID: '317295771036-cr6v48dv6gb070uk9ncdk8qr1odevjuh.apps.googleusercontent.com',
//     clientSecret: 'MxWDG5eioKyuYTRpNVg61ij1',
//     callbackURL: "http://localhost:8081/oauth2callback",
//     passReqToCallback: true
//   },
//   function(token, tokenSecret, profile, done) {
//       process.nextTick(function () {
//
//        // To keep the example simple, the user's Google profile is returned to
//        // represent the logged-in user.  In a typical application, you would want
//        // to associate the Google account with a user record in your database,
//        // and return that user instead.
//        return done(null, profile);
//    });
//   }));

    passport.serializeUser(function(user, done) {
      done(null, user._id);
    });
    passport.deserializeUser(function(_id, done) {
      User.findById(_id, function(err, user) {
        done(err, user);
      });
    });

    app.get('/database/ingredients/grain', grainCtrl.getGrain);
    app.post('/database/ingredients/grain', grainCtrl.addGrain);
    app.put('/database/ingredients/grain/:_id', grainCtrl.updateGrain);

    app.get('/database/ingredients/hops', hopsCtrl.getHops);
    app.post('/database/ingredients/hops', hopsCtrl.addHops);

    app.get('/database/ingredients/yeast', yeastCtrl.getYeast);
    app.post('/database/ingredients/yeast', yeastCtrl.addYeast);

    app.get('/auth/facebook', passport.authenticate('facebook'));
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
      successRedirect: 'http://localhost:5757/',
      failureRedirect: 'http://localhost:5757/#/database'
    }));

    // app.get('/auth/twitter', passport.authenticate('twitter'));
    // app.get('/auth/twitter/callback', passport.authenticate('twitter', {
    //     successRedirect: 'http://localhost:5757/',
    //     failureRedirect: 'http://localhost:5757/#/database'
    // }));
    //
    // app.get('/auth/google', passport.authenticate('google', {scope:
    // [ 'https://www.googleapis.com/auth/plus.login']}));
    // app.get('/oauth2callback', passport.authenticate('google', {
    //     successRedirect: 'http://localhost:5757/',
    //     failureRedirect: 'http://localhost:5757/#/database'
    // }));

    app.post('/register/user', UserCtrl.register);
    app.get('/user', isAuthed, UserCtrl.me);
    app.put('/user', isAuthed, UserCtrl.update);

    app.post('/auth/local', passport.authenticate('local', {
      successRedirect: 'http://localhost:5757/'
    }));
    app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('http://localhost:5757/');
      return res.send('logged out');
    });


app.listen(port, function() {
    console.log('Listening on', port);
});
mongoose.connect('mongodb://localhost:27017/brewabatch', function(err, response) {
    console.log(err, 'Mongo is also Listening');
});
