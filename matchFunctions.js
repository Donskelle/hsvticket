 var request = require("request");
 request = request.defaults({
   jar: true
 })
 const jsdom = require("jsdom");
 const {
   JSDOM
 } = jsdom;




 module.exports = {
   getMatch: (_url) => {
     const options = {
       method: 'GET',
       uri: _url,
       headers: ("Cache-Control", "no-cache")
     };

     return new Promise((resolve, reject) => {

       request(options, function(error, response, body) {
         console.log("get", _url)

         if (error) throw new Error(error);

         let data = []
         let dataOld = null
         try {
           dataOld = getStadiumData(body)
           data = JSON.parse(dataOld);
         } catch (e) {
           reject()
           console.log(e)
         }

         let availableData = data.filter(entry => {
           return Number(entry.freeSeatsQuantity)
         }).filter(entry => {
           if (entry.fullPrice) {
             if (Number(entry.fullPrice) >= 1) {
               return true
             } else {
               return false
             }
           }
           return false
         }).map(entry => {
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

         resolve(availableData)
       })
     })
   },
   getMatches: () => {
     const options = {
       method: 'GET',
       uri: 'https://shop.hsv.de/tickets/heimspiele/'
     };


     return new Promise((resolve, reject) => {
       request(options, function(error, response, body) {
         console.log("get", 'https://shop.hsv.de/tickets/heimspiele/')
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
