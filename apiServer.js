const express = require('express');
const https = require('https');
const fs = require('fs');
const request = require('request');

const app = express();
// enable https
const options = {
  key: fs.readFileSync('/privkey.pem'),
  cert: fs.readFileSync('/fullchain.pem')
};

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/getData', (req, res) => {
  const option = {
    // edit [STATION CODE HERE] to the station code
    url: 'https://api.rtt.io/api/v1/json/search/[STATION CODE HERE]',
    headers: {
      'Authorization': 'Basic ' + Buffer.from('<username>:<password>').toString('base64')
    }
  };

  request(option, (error, response, body) => {
    if(error) {
        console.log(error)
    }
    else {
        try {
            const json = JSON.parse(body);
            res.json(json);
        } catch (error) {
            console.log("error in parseing json",error)
            console.log(body)
        }
    }
  });
});


https.createServer(options, app).listen(8080, () => {
  console.log('API server started on port 8080');
});
