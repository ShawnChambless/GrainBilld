var express = require('express'),
    app = express(),
    session = require('express-session'),
    mongoose = require('mongoose'),
    // passport = require('passport'),
    // flash = require('connect-flash'),
    UserCtrl = require('./controllers/users/userCtrl'),
    port = 8081,
    bodyParser = require('body-parser'),
    grainCtrl = require('./controllers/database/grainCtrl'),
    hopsCtrl = require('./controllers/database/hopsCtrl'),
    yeastCtrl = require('./controllers/database/yeastCtrl'),
    cors = require('cors');

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/public/app/views'));
// app.use(passport.initialize());
// app.use(flash());


// var isAuthed = function(req, res, next) {
//   if (!req.isAuthenticated()) return res.sendStatus(401);
//   return next();
// };
//
// app.use(session({
//     secret: 'iloveaviationordnancemen',
//     resave: false,
//     saveUninitialized: false
// }));
// app.use(passport.session());
// require('./config/passport')(passport)

    app.get('/database/ingredients/grain', grainCtrl.getGrain);
    app.post('/database/ingredients/grain', grainCtrl.addGrain);
    app.put('/database/ingredients/grain/:_id', grainCtrl.updateGrain);

    app.get('/database/ingredients/hops', hopsCtrl.getHops);
    app.post('/database/ingredients/hops', hopsCtrl.addHops);

    app.get('/database/ingredients/yeast', yeastCtrl.getYeast);
    app.post('/database/ingredients/yeast', yeastCtrl.addYeast);


  //   app.post('/register/user', passport.authenticate('local', {
  //     successRedirect: 'http://localhost:5757/',
  //     failureRedirect: 'http://localhost:5757/#/database'
  // }), function() {
  //     UserCtrl.register
  // });
  //   app.get('/user', isAuthed, UserCtrl.me);
  //   app.put('/user', isAuthed, UserCtrl.update);

    // app.post('/auth/local', passport.authenticate('local', {
    //   successRedirect: 'http://localhost:5757/'
    // }));

    // app.get('/logout', function(req, res) {
    //   req.logout();
    //   res.redirect('http://localhost:5757/');
    //   return res.send('logged out');
    // });


app.listen(port, function() {
    console.log('Listening on', port);
});
mongoose.connect('mongodb://localhost:27017/brewabatch', function(err, response) {
    console.log(err, 'Mongo is also Listening');
});
