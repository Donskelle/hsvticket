let searchPrice,
  blockResponse = [],
  searchFound = false;
const requestUrl = '/matches'
const head = document.querySelector('.head')
const body = document.querySelector('.body')
const sound = document.querySelector('.sound')

showUpcommingMatches()



function showUpcommingMatches() {
  body.innerHTML = 'Get upcomming matches'

  fetch(requestUrl, {
      credentials: 'include'
    })
    .then(function(response) {
      return response.json()
    }).then(function(data) {
      body.innerHTML = buildGameLinks(data)
      initMatchClicks(scanMatch)
    }).catch(function(e) {
      console.log(e)
    });
}

function scanMatch(title, url) {
  head.innerHTML = title
  if (!Number.isInteger(searchPrice))
    body.innerHTML = '<a href="#" onclick="addAlert()">Add Alert!</a>' + addLoader()
  else
    body.innerHTML = `Looking for ${searchPrice}€ <small><a href="#" onclick="addAlert()">change</a></small><br>` + addLoader()


  const opt = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      url: url
    })
  }

  fetch(requestUrl, opt)
    .then(function(response) {
      return response.json()
    }).then(function(blocks) {
      blockResponse = blocks
      body.innerHTML += showSeats(blocks)
      document.querySelector(".loading").remove()

      checkPrice()
      delayedScanMatch(title, url)
    }).catch(function(e) {
      console.log(e)
      delayedScanMatch(title, url)
    })
}



function addAlert() {
  searchPrice = parseInt(prompt('Price to look for'))
  if (!Number.isInteger(searchPrice)) {
    alert("Not Valid")
  } else {
    checkPrice()
  }
}

function checkPrice() {
  // already found check if still avaible
  if (searchFound) {
    if (!foundPrice()) {
      searchFound = false
      sound.innerHTML = ""
    }
  } else if (foundPrice()) {
    sound.innerHTML += addSound()
  }
}

function foundPrice() {
  if (Number.isInteger(searchPrice)) {
    if (blockResponse.length >= 1) {
      if (blockResponse[0].price <= searchPrice) {
        searchFound = true
        return true
      }
    }
  }
  return false
}

function delayedScanMatch(title, url, delay = 8000) {
  window.setTimeout(function() {
    scanMatch(title, url);
  }, delay);
}
