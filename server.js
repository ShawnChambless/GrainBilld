var express = require('express'),
    app = express(),
    session = require('express-session'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    TwitterStrategy = require('passport-twitter').Strategy,
    GoogleStrategy = require('passport-google').Strategy,
    //User = require('./controllers/users/userCtrl'),
    port = 8081,
    bodyParser = require('body-parser'),
    grainCtrl = require('./controllers/database/grainCtrl'),
    hopsCtrl = require('./controllers/database/hopsCtrl'),
    yeastCtrl = require('./controllers/database/yeastCtrl'),
    cors = require('cors');

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/public/app/'));
app.use(passport.initialize());
app.use(passport.session());

app.use(session({
    secret: 'gibberish',
    resave: false,
    saveUninitialized: false
}));

passport.use(new FacebookStrategy({
    clientID: '382558321950904',
    clientSecret: 'a09fff493ed129f076a75d5f85d33562',
    callbackURL: "http://localhost:5757/#/NewBatch",
    profileFields: ['id', 'displayName', 'photos'],
    enableProof: false
  },
    function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({facebookId: profile.id}, function(err, user) {
          if (err) { return done(err); }
          done(null, user);
        });
    }));

    passport.serializeUser(function(user, done) {
        console.log('Serialized', user);
        done(null, user);
    });
    passport.deserializeUser(function(user, done) {
        console.log('Deserialized', user);
        done(null, user);
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
      failureRedirect: 'http://localhost:5757/'
    }));

    app.get('/logout', function(req, res) {
        req.logOut();
        req.session.destroy();
        res.redirect('http://localhost:5757/#/NewBatch');
    });


app.listen(port, function() {
    console.log('Listening on', port);
});
mongoose.connect('mongodb://localhost:27017/brewabatch', function(err, response) {
    console.log(err, 'Mongo is also Listening');
});
