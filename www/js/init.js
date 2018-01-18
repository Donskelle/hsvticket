let searchPrice,
  blockResponse = [],
  searchFound = false;
const requestMatches = '/matches'
const requestMatchUrl = '/match/'
const head = document.querySelector('.head')
const body = document.querySelector('.body')

const opt = {
  credentials: 'include'
}


showUpcommingMatches()


function showUpcommingMatches() {
  body.innerHTML = 'Get upcomming matches'

  fetch(requestMatches, opt)
    .then(function(response) {
      return response.json()
    }).then(function(data) {
      body.innerHTML = buildGameLinks(data)
      initMatchClicks(scanMatch)
      console.log(data)
    }).catch(function(e) {
      console.log(e)
    });
}

function scanMatch(title, url) {
  head.innerHTML = title
  body.innerHTML = '<p class="alertHeader"></p>'
  body.innerHTML += '<div class="blocks">' + addLoader() + '</div>'

  updateAlertHeader()
  fetchMatch(url)
}

function fetchMatch(url) {
  document.querySelector(".blocks").innerHTML = addLoader()
  fetch(requestMatchUrl + encodeURIComponent(url), opt)
    .then(function(response) {
      return response.json()
    }).then(function(blocks) {
      blockResponse = blocks
      document.querySelector(".blocks").innerHTML = showSeats(blocks)
      document.querySelector(".loading").remove()

      checkPrice()
      delayedScanMatch(url)
    }).catch(function(e) {
      console.log(e)
      delayedScanMatch(url)
    })
}


function addAlert() {
  searchPrice = parseInt(prompt('Enter Price to look for'))
  if (!Number.isInteger(searchPrice)) {
    alert("Not Valid")
  } else {
    updateAlertHeader()
    checkPrice()
  }
}

function checkPrice() {
  // already found check if still avaible
  if (searchFound) {
    if (!foundSearchedPrice()) {
      searchFound = false
      whop.pause()
    }
  } else if (foundSearchedPrice()) {
    searchFound = true
    whop.play()
  }
}

function foundSearchedPrice() {
  if (Number.isInteger(searchPrice)) {
    if (blockResponse.length >= 1) {
      if (blockResponse[0].price <= searchPrice) {
        return true
      }
    }
  }
  return false
}

function delayedScanMatch(url, delay = 11000) {
  window.setTimeout(function() {
    fetchMatch(url)
  }, delay);
}

function updateAlertHeader() {
  const alertHead = document.querySelector('.alertHeader')
  if (!Number.isInteger(searchPrice))
    alertHead.innerHTML = '<a href="#" onclick="addAlert()">Add Alert!</a>'
  else
    alertHead.innerHTML = `Looking for ${searchPrice}€ <small><a href="#" onclick="addAlert()">change</a></small>`
}
