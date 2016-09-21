var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var crypto = require('crypto');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var port = process.env.PORT || 8080;

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var Comment = require('./app/models/comment');


app.get('/', function(req, res) {
    res.sendFile('./homePage.html', { root: __dirname });
});

app.post('/send', function(req, res) {
    var comment = new Comment();
    comment.username = req.body.name;
    comment.message = req.body.message;
    comment.img = crypto.createHash('md5').update(req.body.name).digest("hex");

    comment.save(function (err) {
        if (err)
            res.send(err);

        res.json({message: 'Comment created!'});
    });
});

app.get('/get', function(req, res){
    Comment.find(function(err, comment) {
        if (err)
            res.send(err);

        res.json(comment);
    });
});

app.listen(port);
console.log('Magic happens on port ' + port);
