var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    port = 8081,
    bodyParser = require('body-parser'),
    databaseCtrl = require('./controllers/database/databaseCtrl'),
    cors = require('cors');

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/public/app/views/databaseTmpl.html'));

    app.get('/database', databaseCtrl.getGrain);
    app.post('/database', databaseCtrl.addGrain);

app.listen(port, function() {
    console.log('Listening on', port);
});
mongoose.connect('mongodb://localhost:27017/brewabatch', function(err, response) {
    console.log(err, 'Mongo is also Listening');
});
