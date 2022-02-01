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
  dateStr.replace(/['"]+/g,'');
  console.log('Date string:',dateStr);
  const dtYfRE =  /^\d{2,4}-\d{1,2}-\d{1,2}$/;
  console.log('dtYfRE:',dtYfRE.test(dateStr));
  const dtYlRE = /^\d{1,2}-\d{1,2}-\d{2,4}$/;
  console.log('dtYlRE:',dtYlRE.test(dateStr));
  const dtMDY = /^\w{3,} \d{1,2}, \d{2,4}$/;
  console.log('dtMDY:',dtMDY.test(dateStr));
  const msRE = /^\d{1,13}$/;
  console.log('msRE:',msRE.test(dateStr));
  let dtFnd = false;
  let dUTC = '';
  let msec;

  switch (true) {
    case dtYfRE.test(dateStr) ||
         dtYlRE.test(dateStr) ||
         dtMDY.test(dateStr):
      dUTC = new Date(dateStr).toUTCString();
      msec = Date.parse(dateStr);
      dtFnd = true;
      break;
    case msRE.test(dateStr):
      msec = parseInt(dateStr);
      dUTC = new Date(msec).toUTCString();
      dtFnd = true;
      break;
    case (dateStr === null):
      dUTC = new Date().toUTCString();
      msec = Date.parse(dUTC);
      dtFnd = true;
      break;
    default:
      res.json({error: "Invalid Date"});
  }
  if (dtFnd) { res.json({ unix: msec, utc: dUTC }); }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
