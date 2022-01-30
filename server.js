// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// The dateTime API endpoint
app.get("/api/:date", function (req, res) {
  // Add the statements to get to point C!!!
  const dateStr = req.params.date;
  console.log('Date string:',dateStr);
  const dtRE =  /^\d{1,4}-\d{1,2}-\d{1,2}$/;
  const msRE = /^\d{1,13}$/;

  if ( dtRE.test(dateStr) ) {
    let dUTC = new Date(dateStr).toUTCString();
    let msec = Date.parse(dateStr);
    res.json({ unix: msec, utc: dUTC }); 
  } else if ( msRE.test(dateStr) ) {
    let msec = parseInt(dateStr);
    let dUTC = new Date(msec).toUTCString();
    res.json({ unix: msec, utc: dUTC });
  } else {
    console.error("Incorrect date string format");
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
