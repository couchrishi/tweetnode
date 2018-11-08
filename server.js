var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  ,Twit = require('twit')
  , io = require('socket.io').listen(server);
	
server.listen(8118);

// routing
app.get('/', function (req, res) {
res.sendfile(__dirname + '/index.html');
});

var watchList = ['Happy Diwali'];
 var T = new Twit({
    consumer_key:         'J653fFCFs0e6zVVQ6Iv0g'
  , consumer_secret:      '9gWMjoU1sdaTng57fpn3kJJLqcYXEPZtUWcTTmv7I'
  , access_token:         '28950913-t6S1OOYW3TEqOCVdyqqtttguP0a9WPfLkdUqe3diB'
  , access_token_secret:  'ITLOMomZzFw3WXIEt5ZureboGv0CHzyvAyDdiWcevuDwe'
})

io.sockets.on('connection', function (socket) {
  console.log('Connected');


 var stream = T.stream('statuses/filter', { track: watchList })

  stream.on('tweet', function (tweet) {

    io.sockets.emit('stream',tweet.text);


  });
 });