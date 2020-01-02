const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quote-display')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')

quoteInputElement.addEventListener('input', () =>{
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')  
    const arrayValue = quoteInputElement.value.split('')

    let correct = true
    arrayQuote.forEach((characterSpan,index)=>{
        const character = arrayValue[index]
        if(character == null){
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            correct = false
        }
        else if(character === characterSpan.innerText){
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        }else{
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
            correct = false
        }
    })
    if (correct) renderNewQuote()
})
function getRanodmQuote(){
    return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}

async function renderNewQuote(){
    const quote = await getRanodmQuote()
    quoteDisplayElement.innerText = ''
    quote.split('').forEach(character =>{
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        quoteDisplayElement.appendChild(characterSpan)
    })
    quoteInputElement.value = null
    StartTimer()
}

let startTime
function StartTimer(){
    timerElement.innerText = 0
    startTime = new Date()
    setInterval(() =>{
        timer.innerText = getTimerTime()
    }, 1000)
}

function getTimerTime(){
    return Math.floor((new Date() - startTime) / 1000)
}

renderNewQuote()