var express =       require('express'),
    app     =       express(),
    session =       require('express-session'),
    mongoose =      require('mongoose'),
    passport =      require('./api/services/passport.js'),
    userCtrl =      require('./api/controllers/users/userCtrl'),
    recipeCtrl =    require('./api/controllers/recipes/recipesCtrl'),
    bodyParser =    require('body-parser'),
    grainCtrl =     require('./api/controllers/database/grainCtrl'),
    hopsCtrl =      require('./api/controllers/database/hopsCtrl'),
    yeastCtrl =     require('./api/controllers/database/yeastCtrl'),
    favicon   =     require('serve-favicon'),
    cors =          require('cors'),
    http        = require('http'),
    httpServer  = http.createServer(app),
    port = 8080;


app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());
app.use(cors());
app.use(session({
    secret: 'JESUS-MakEs-really-good-beer',
    resave: 'false',
    saveUninitialized: true
}));
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
    });

    //User endpoints

    app.post(   '/api/users',                       userCtrl.create );
    app.get(    '/api/user/',                       userCtrl.getCurrentUser);
    app.put(    '/api/users/:user_id',              userCtrl.update );
    app.put(    '/api/users/:user_id/:recipe_id',   userCtrl.updateRecipes);
    app.delete( '/api/users/:user_id',              userCtrl.remove );

    //Recipe endpoints

    app.post(   '/api/recipes',   recipeCtrl.addRecipe);
    app.get(    '/api/recipes',   recipeCtrl.retrieveRecipes);
    app.get(    '/api/recipes/:user_id', recipeCtrl.retrieveUserRecipes);
    app.put(    '/api/recipes',    recipeCtrl.editRecipe);
    app.delete( '/api/recipes',   recipeCtrl.removeRecipe);

    //Database endpoints

    app.get(    '/database/ingredients/grain',      grainCtrl.getGrain);
    app.post(   '/database/ingredients/grain',      grainCtrl.addGrain);
    app.put(    '/database/ingredients/grain/:_id', grainCtrl.updateGrain);
    app.get(    '/database/ingredients/hops',       hopsCtrl.getHops);
    app.post(   '/database/ingredients/hops',       hopsCtrl.addHops);
    app.get(    '/database/ingredients/yeast',      yeastCtrl.getYeast);
    app.post(   '/database/ingredients/yeast',      yeastCtrl.addYeast);


mongoose.connect('mongodb://localhost:27017/brewabatch', function(err, response) {
    console.log(err, 'Mongo is also Listening');
});
httpServer.listen(port, function() {
    console.log('Listening with httpServer on', port);
});
