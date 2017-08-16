var express = require('express');

var app = express();

var port = process.env.PORT || 3000;

var apiRouter = express.Router();

apiRouter.route('/Books')
    .get(function(req, res){
        var responseJson = { hello: "This is my books API."};

        res.json(responseJson);
    });

app.use('/api', apiRouter);

app.get('/', function(req, res){
    res.send('welcome to my API now.');
});

app.listen(port, function() {
    console.log('Running on PORT: ' + port);
});