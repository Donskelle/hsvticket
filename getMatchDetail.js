const request = require("request");
const jsdom = require("jsdom");
const {
  JSDOM
} = jsdom;




module.exports = {
  getMatch: (_url) => {
    const options = {
      method: 'GET',
      uri: _url
    };

    return new Promise((resolve, reject) => {
      request(options, function(error, response, body) {
        if (error) throw new Error(error);

        let data = []
        try {
          data = JSON.parse(getStadiumData(body));
        } catch (e) {
          console.log(e)
        }

        let avaibleData = data.filter(entry => {
          return Number(entry.freeSeatsQuantity)
        }).map(entry => {
          if (entry.fullPrice)
            return {
              price: Number(entry.fullPrice),
              name: entry.name,
              freeSeats: Number(entry.freeSeatsQuantity),
              link: entry.link
            }
        }).sort((a, b) => {
          let aP = Number(a.price)
          let bP = Number(b.price)
          if (aP < bP)
            return -1;
          if (aP > bP)
            return 1;
          return 0;
        })

        resolve(avaibleData)
      })
    })
  },
  getMatches: () => {
    const options = {
      method: 'GET',
      uri: 'https://shop.hsv.de/deutsch/tickets/heimspiele/'
    };


    return new Promise((resolve, reject) => {
      request(options, function(error, response, body) {
        if (error) throw new Error(error);
        const dom = new JSDOM(body);
        let matches = [...dom.window.document.querySelectorAll('.product--box.hsv-ticket')].map(ele => {
          return {
            title: ele.querySelector('.hsv-ticket__title').textContent,
            url: ele.querySelector('.hsv-ticket-price.hsv-button').href
          }
        })

        resolve(matches)
      })
    })
  }
}


function getStadiumData(body) {
  const searchString = 'var sliderData = $.parseJSON(\'';
  const n = body.indexOf(searchString);
  const nUntil = body.indexOf('\');', n + searchString.length);

  return body.slice(n + searchString.length, nUntil)
}
