var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  ,Twit = require('twit')
  , io = require('socket.io').listen(server)
  , url = require('url');
	
server.listen(8118);

app.use(express.static('images'));

// routing
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
  });

app.get('/sector', function(req,res)
{

var sectorVar = url.parse(req.url, true).query['sector'];
console.log(sectorVar);

switch (sectorVar) 
{
    case "automobile":
        var watchList = ['auto loans'];
        res.sendFile(__dirname + '/auto_index.html');
		    break;
    case "telecom":
        var watchList = ['telecom offers'];
        res.sendFile(__dirname + '/telco_index.html');
		    break;
    case "retail":
        var watchList = ['Retail Offers'];
        res.sendFile(__dirname + '/retail_index.html');
		    break;
    case "loans":
        var watchList = ['loans'];
        res.sendFile(__dirname + '/loan_index.html');
        break;
}


console.log(watchList);

 var T = new Twit({
    consumer_key:         'AS9WAgK5oPP0NfEbAlUNnMXAx'
  , consumer_secret:      'XitRHP5dCc2BybKNx4oeVVTMgwTfQfbwldiowPIaA8QevjbulS'
  , access_token:         '28950913-1fPhERjmper8BXqCPtlOejazAOOXrVwgIe4COOBTl'
  , access_token_secret:  'xKZbxdHJ3g19scSRXlOyk6LuzZfy1oscmU9vff0hoYHwa'
})


io.sockets.on('connection', function (socket) 
{
  console.log('Connected');
  var stream = T.stream('statuses/filter', {track: watchList})

  console.log(stream);
  
  stream.on('tweet', function (tweet) 
  {
    console.log('inside stream function');
    io.sockets.emit('stream',tweet.text);
    console.log(tweet.text);
  });
 });

  
});