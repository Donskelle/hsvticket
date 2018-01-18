'use strict';

// [START app]
const express = require('express');
const bodyParser = require('body-parser')
const match = require('./getMatchDetail.js');
const basicAuth = require('express-basic-auth')

const app = express();
const PORT = process.env.PORT || 8080;



app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(express.static('www/public'))
app.use(basicAuth({
    users: {
        'hsv': 'fan'
    },
    challenge: true
}))




app.get('/', (req, res) => {
  res.sendFile('www/public/index.html', { root: __dirname });
});


app.get('/matches', (req, res) => {
  handleGetMatches(res)
  .catch(e => {
    console.log(e)
  })
});

app.post('/matches', (req, res) => {
  handleMatch(req.body.url, res)
    .catch(e => {
      console.log(e)
    })
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

async function handleMatch(url, res) {
  console.log("url", url)
  let data = await match.getMatch(url)
  res.send(data)
}
async function handleGetMatches(res) {
  let possibleMatches = await match.getMatches()
  res.send(possibleMatches)
}
