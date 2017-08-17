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

var apiRouter = express.Router();

apiRouter.route('/Books')
    .post(function(req, res){
        var book = new Book(req.body);

        console.log('Received a book: ' + book);
        book.save();
        res.status(200).send(book);
    })
    .get(function(req, res){

        var query = {};
        if (req.query.genre) {
            query.genre = req.query.genre;
        }
        Book.find(query, function(err, books) {
            if (err)
                res.status(500).send(err);
            else
                res.json(books);
        })
    });
apiRouter.route('/Books:bookId')
    .get(function(req, res){
    
            Book.findById(req.params.bookId, function(err, book) {
                if (err)
                    res.status(500).send(err);
                else
                    res.json(book);
            })
        });

app.use('/api', apiRouter);

app.get('/', function(req, res){
    res.send('welcome to my API now.');
});

app.listen(port, function() {
    console.log('Running on PORT: ' + port);
});