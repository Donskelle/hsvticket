'use strict';
const express = require('express');
const bodyParser = require('body-parser')
const match = require('./matchFunctions.js');

const app = express();
const PORT = process.env.PORT || 8080;



app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(express.static('www/public'))

/*const basicAuth = require('express-basic-auth')
app.use(basicAuth({
  users: {
    'hsv': 'fan'
  },
  challenge: true
}))*/




app.get('/', (req, res) => {
  res.sendFile('www/public/index.html', {
    root: __dirname
  });
});


app.get('/matches', (req, res) => {
  handleGetMatches(res)
    .catch(e => {
      console.log(e)
    })
});

app.get('/match/:uid', (req, res) => {
  handleMatch(decodeURIComponent(req.params.uid), res)
    .catch(e => {
      console.log(e)
    })
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

async function handleMatch(url, res) {
  try {
    let data = await match.getMatch(url)
    res.send(data)
  } catch (e) {
    res.send([])
  }
}
async function handleGetMatches(res) {
  try {
    let possibleMatches = await match.getMatches()
    res.send(possibleMatches)
  } catch (e) {
    res.send([])
  }
}
