 function buildGameLinks(arr) {
   let domString = ""
   arr.forEach(match => {
     domString += `<a data-url="${match.url}" class="matchLink" href="#">${match.title}</a>`
   })
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

 function startScan(url) {
   console.log(url)
 }

 function showSeats(blocks) {
   let domString = "<h4></h4>"
   if (blocks.length == 0)
     domString += `<p>blocks.length == 0</p>`
   blocks.forEach(block => {
     domString += `<p>
    <a data-url="" class="matchLink" href="${block.link}">${block.name}</a>
    Freie Sitze ${block.freeSeats} Price: ${block.price} €
    </p>`
   })
   return domString
 }

 function addSound() {
   return `<iframe width="560" height="315" src="https://www.youtube.com/embed/MFlW0IdWwE0?autoplay=1" frameborder="0" allowfullscreen autoplay="1"></iframe>`
 }

 function addLoader() {
   return '<div class="loading"></div>'
 }

 function removeLoader() {
   document.querySelector('.loader')
 }
