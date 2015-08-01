var express =       require('express'),
    app = express(),
    session =       require('express-session'),
    mongoose =      require('mongoose'),
    passport =      require('passport'),
    UserCtrl =      require('./api/controllers/users/userCtrl'),
    port = 8081,
    bodyParser =    require('body-parser'),
    grainCtrl =     require('./api/controllers/database/grainCtrl'),
    hopsCtrl =      require('./api/controllers/database/hopsCtrl'),
    yeastCtrl =     require('./api/controllers/database/yeastCtrl'),
    cors =          require('cors');

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/public'));

app.use(passport.initialize());
app.use(passport.session());

    app.post('/auth/local/signup', passport.authenticate( 'local-signup' ), function(req, res){
      res.json(req.user);
    });
    app.post('/auth/local/login', passport.authenticate( 'local-login' ), function(req, res){
      res.json(req.user);
    });
    app.get('/auth/logout', function(req, res){
      req.logout();
      res.redirect('/');
      return res.send('logged out');
    });

    // app.post(   '/api/users',          userCtrl.create );
    // app.get(    '/api/users/:user_id', userCtrl.retrieveOne );
    // app.get(    '/api/user/',          userCtrl.getCurrentUser);
    // app.put(    '/api/users/:user_id', userCtrl.update );
    // app.delete( '/api/users/:user_id', userCtrl.remove );



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
