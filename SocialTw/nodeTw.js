// to get the express library
var express = require('express');

// creates the server
var app = express.createServer();

// listens to port 8000
app.listen(8000);

// responds to get request of '/' and sends message
app.get('/', function(req, res) {
   res.send('Welcome to Node Twitter');
});

var tweets = [];

// accepts post requests
// bodyParser middleware allows extra configurations to req
// body is an object representing post data
app.post('/send', express.bodyParser(), function(req, res) {

   if (req.body && req.body.tweet) {
      tweets.push(req.body.tweet);
      res.send({status: "ok", message: "Tweet received"});
   } else {
      res.send({status: "nok", message: "No tweet received"});
   }
   
});

// listens to tweets
app.get('/tweets', function(req, res) {
   
   res.send(tweets);
   
});
