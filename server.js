var express = require('express'),
    app = express(),
    session = require('express-session'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    port = 8081,
    bodyParser = require('body-parser'),
    grainCtrl = require('./controllers/database/grainCtrl'),
    hopsCtrl = require('./controllers/database/hopsCtrl'),
    yeastCtrl = require('./controllers/database/yeastCtrl'),
    cors = require('cors');

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/public/app/'));
app.use(session({
    secret: 'gibberish',
    resave: false,
    saveUninitialized: false
}));

// passport.use(new FacebookStrategy({
//     clientID: '125213324481577',
//     clientSecret: '65eefc971ab61a11dcf39311de3e6ba4',
//     callbackURL: "http://localhost:8081/auth/facebook/callback",
//     enableProof: false
//   },
//   function(accessToken, refreshToken, profile, done) {
//     User.findOrCreate({ facebookId: profile.id }, function (err, user) {
//       return done(err, user);
//     });
//   }
// ));
//
//     app.get('/auth/facebook', passport.authenticate('facebook'));
//     app.get('/auth/facebook/callback', passport.authenticate('facebook', {
//         failureRedirect: '/#/NewBatch'}),
//         function(req, res) {
//             res.redirect('/#/NewBatch')
//         });
//
//     passport.serializeUser(function(user, done) {
//         console.log('Serialized', user);
//         done(null, user);
//     });
//     passport.deserializeUser(function(user, done) {
//         console.log('Deserialized', user);
//         done(null, user);
//     });
//

    app.get('/database/ingredients/grain', grainCtrl.getGrain);
    app.post('/database/ingredients/grain', grainCtrl.addGrain);
    app.put('/database/ingredients/grain/:_id', grainCtrl.updateGrain);

    app.get('/database/ingredients/hops', hopsCtrl.getHops);
    app.post('/database/ingredients/hops', hopsCtrl.addHops);

    app.get('/database/ingredients/yeast', yeastCtrl.getYeast);
    app.post('/database/ingredients/yeast', yeastCtrl.addYeast);

app.listen(port, function() {
    console.log('Listening on', port);
});
mongoose.connect('mongodb://localhost:27017/brewabatch', function(err, response) {
    console.log(err, 'Mongo is also Listening');
});
