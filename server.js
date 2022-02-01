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

// The default dateTime API endpoint
app.get('/api', (req,res) => {
  let dUTC = new Date().toUTCString();
  let msec = Date.parse(dUTC);
  res.json({ unix: msec, utc: dUTC });
});

// The dateTime API endpoint
app.get("/api/:date", function (req, res) {
  // Add the statements to get to point C!!!
  let dateStr = req.params.date;
  console.log('Date string:',dateStr);
  const msRE = /^\d{1,13}$/;
  console.log('msRE:',msRE.test(dateStr));

    if (msRE.test(dateStr)) {
      let dInt = parseInt(dateStr);
      
      res.json({ unix: dInt, utc: new Date(dInt).toUTCString() });
  } else {
      let dUTC = new Date(dateStr);

      if (dUTC.toString() === "Invalid Date") {
        res.json({error: "Invalid Date"});
      } else {
        res.json({ unix: Date.parse(dUTC), utc: dUTC.toUTCString() }); 
      }
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
