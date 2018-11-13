var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  ,Twit = require('twit')
  , io = require('socket.io').listen(server)
  , url = require('url');
	
server.listen(8118);

// routing
app.get('/', function (req, res) {
res.sendfile(__dirname + '/index.html');
var sectorVar = url.parse(req.url, true).query['sector'];
console.log(sectorVar);
switch (sectorVar)

{
    case "automobile":
        var watchList = ['auto loans'];
        break;

    case "telecom":
        var watchList = ['telecom offers'];
        break;

    case "retail":
        var watchList = ['Retail Offers'];
        break;

    case "loans":
        var watchList = ['loans'];
        break;

    default: var watchList = ['Happy Diwali'];
}
});

var T = new Twit({
  consumer_key:         'F9W2XZA9Wv26QZp8hIrJtVcgO'
, consumer_secret:      'uZwqHcMFbkZcGisvj9fF3yqIV2PVqiY345ZU1qP9glGzLO6r6H'
, access_token:         '28950913-9mTpVbIo5XM4rtY6ARjFckKsSXUAH04sTmiy4KVOy'
, access_token_secret:  'mZPGC5CDwSBtDtcPp72ZfAy5bsR2B9g7hs3LVPLqtR19F'

})

io.sockets.on('connection', function (socket) {
  console.log('Connected');


 var stream = T.stream('statuses/filter', { track: watchList })

  stream.on('tweet', function (tweet) {

    io.sockets.emit('stream',tweet.text);


  });
 });