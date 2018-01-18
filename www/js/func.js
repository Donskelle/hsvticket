 function buildGameLinks(arr) {
   let domString = ""
   arr.forEach(match => {
     domString += `<a data-url="${match.url}" class="matchLink" href="#">${match.title}</a>`
   })
   if (arr.length == 0)
     domString += 'Response Error'
   return domString
 }

 function initMatchClicks(fn) {
   [...document.querySelectorAll('.matchLink')].forEach(link => {
     link.addEventListener('click', e => {
       console.log(e.target.dataset.url)
       fn(e.target.textContent, e.target.dataset.url)
     })
   })
 }

 function showSeats(blocks) {
   let domString = "<h4></h4>"
   if (blocks.length == 0)
     domString += `<p>blocks.length == 0</p>`
   blocks.forEach(block => {
     domString += `<p>
    <a data-url="" class="matchLink" href="${block.link}">${block.name}</a>
    Free Seats ${block.freeSeats} Price: ${block.price} €
    </p>`
   })
   return domString
 }

 function addLoader() {
   return '<div class="loading"></div>'
 }
