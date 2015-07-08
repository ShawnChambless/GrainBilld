var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    port = 8081,
    bodyParser = require('body-parser'),
    grainCtrl = require('./controllers/database/grainCtrl'),
    hopsCtrl = require('./controllers/database/hopsCtrl'),
    yeastCtrl = require('./controllers/database/yeastCtrl'),
    cors = require('cors');

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/public/app/views/databaseTmpl.html'));


    app.get('/database/ingredients/grain', grainCtrl.getGrain);
    app.post('/database/ingredients/grain', grainCtrl.addGrain);

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
