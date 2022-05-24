let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message_el = document.getElementById("message-el")
let sumEL = document.querySelector(".sum-el")
let cardsEl = document.getElementById("cards-el")
let cardset = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 11]

function startGame(){
    if (sum === 0){    
        isAlive = true
        cards.push(generateRandCard())
        cards.push(generateRandCard())
        renderGame()
    } else {
        message_el.textContent = "Reset to play a new round"
    } 
}

function renderGame(){
    sum = 0
    cardsEl.textContent = "Cards: "
    for (let i=0; i< cards.length; i++){
        cardsEl.textContent += cards[i] + " "
        sum += cards[i]
    }
    sumEL.textContent = "Sum: " + sum


    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
    } else {
        message = "You're out of the game!"
        isAlive = false
    }
    message_el.textContent = message
}

function newCard(){
    if (sum > 0 && sum < 21){
        message_el.textContent = "Drawing a new card"
        let newCard = 7
        cards.push(newCard)
        renderGame()
    }
}

function generateRandCard(){
    rnd = Math.floor(Math.random() * cardset.length)
    return cardset[rnd]
}

function resetGame(){
    cards = []
    sum = 0
    cardsEl.textContent = "Cards: "
    sumEL.textContent = "Sum: "
    message_el.textContent = "Want to play another round?"
}
