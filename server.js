var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    port = 8081,
    bodyParser = require('body-parser'),
    cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public/app/views'));

app.get('/', function(req, res) {
    console.log('Got it')
});
app.post('/database', function(req, res) {
    
});


app.listen(port, function() {
    console.log('Listening on', port);
});
mongoose.connect('mongodb://localhost:27017/brewbetter', function(err, response) {
    console.log(err, 'Mongo is also Listening');
});
