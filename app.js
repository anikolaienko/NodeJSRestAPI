var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var option = {
    server: {
        socketOptions: {
            keepAlive: 300000,
            connectTimeoutMS: 30000
        }
    },
    replset: {
        socketOptions: {
            keepAlive: 300000,
            connectTimeoutMS: 30000
        }
    }
};

var db = mongoose.connect('mongodb://127.0.0.1:27017/booksapi', option).then(function(){
    //connected successfully
    console.log('Successfully connected to DB.');
}, function(err) {
    //err handle
    console.log('Error connecting to DB: ' + err);
});

var Book = require('./models/bookModel');
var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var bookRouter = require('./Routes/bookRoutes');

app.use('/api', bookRouter(Book));

app.get('/', function(req, res){
    res.send('welcome to my API now.');
});

app.listen(port, function() {
    console.log('Running on PORT: ' + port);
});