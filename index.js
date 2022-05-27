let cards = []
let dealer_cards = []
let sum = []
let dealer_sum = []
let hasBlackJack = false
let isAlive = false
let split_cards = false
const messageEL = document.getElementById("message-el")
const sumEL = document.querySelector(".sum-el")
const cardsEl = document.getElementById("cards-el")
const dealCardsEl = document.getElementById("deal_cards-el")
const dealSumEl = document.getElementById("deal_sum-el")
const startBtn = document.getElementById("start-btn")
const hitBtn = document.getElementById("hit-btn")
const newRoundBtn = document.getElementById("newRound-btn")
const standBtn = document.getElementById("stand-btn")
const splitBtn = document.getElementById("split-btn")

//define the cardset that we play with
const cardset_symb = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "B", "D", "K", "A"]
const cardset_val = [ 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11]
let capacity = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]

//set initial 
let money = 100
const moneyEl = document.getElementById("money-el")

let bet = 10
let double_bet = bet * 2
let surrender = bet * 0.5
moneyEl.textContent = "Money: " + money + "$"

// to hide the buttons that are not necessary before the game starts
newRoundBtn.style.display = "none"
hitBtn.style.display = "none"
standBtn.style.display = "none"
splitBtn.style.display = "none"




function startGame(){
    //initialize array to save the sums, two in case if Ace is drawn
    curr_sum = [0, 0]
    sum.push(curr_sum)

    //set buttons
    startBtn.style.display = "none"
    hitBtn.style.display = "inline-block"
    standBtn.style.display = "inline-block"
    newRoundBtn.style.display = "inline-block"


    if (sum[0][0] === 0){    
        isAlive = true
        cards.push(generateRandCard())
        cards.push(generateRandCard())
        dealerInitialTurn()
        renderGame()
    } else if (sum[0][0] != 0 && isAlive === true){
        messageEL.textContent = "Finish current round"
    } else{
        messageEL.textContent = "Press New Round to play a another round"
    }
}

function dealerInitialTurn(){
    dealer_cards.push(generateRandCard())
    console.log(dealer_cards)
    console.log(cardset_symb[dealer_cards[0]])
    console.log(cardset_val[dealer_cards[0]])
    //dealCardsEl.textContent = "Dealer cards: " + cardset_symb[dealer_cards[0]]
    //dealSumEl.textContent = "Dealer's sum: " + cardset_val[dealer_cards[0]]
}

function renderGame(){
    sum[0][0] = 0
    sum[0][1] = 0

    sum =  outputSum(cards)

    message = checkSum()
    messageEL.textContent = message
}

function checkSum(){
    if (sum[0][0] <= 20 && sum[0][1] !== 21) {
        message = "Do you want to draw a new card?"
    } else if (sum[0][0] === 21 || sum[0][1] === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
    } else {
        message = "You're out of the game!"
        isAlive = false
    }
    return message
}

function hit(){
    console.log(sum[0][0] > 0)
    console.log(sum[0][0] < 21)
    console.log(sum[0][1] !== 21)

    if (sum[0][0] > 0 && sum[0][0] < 21 && sum[0][1] !== 21){
        messageEL.textContent = "Drawing a new card"
        cards.push(generateRandCard())
        renderGame()
    }
}

function stand(){
    messageEL.textContent = "Waiting for the dealer's turn"
}

function generateRandCard(){
    rnd = Math.floor(Math.random() * cardset_val.length)
    do{
        rnd = Math.floor(Math.random() * cardset_val.length)
    } while (capacity[rnd] <= 0)
    capacity[rnd] -= 1 
    return rnd
}

function newRound(){
    cards = []
    sum = []
    newRoundBtnCapacity()
    cardsEl.textContent = "Cards: "
    sumEL.textContent = "Sum: "
    messageEL.textContent = "Want to play another round?"
    startBtn.style.display = "inline-block"

    //hide buttons
    hitBtn.style.display = "none"
    standBtn.style.display = "none"
    splitBtn.style.display = "none"
}

function aceCheck(cards){
    for (let i=0; i< cards.length; i++){
        if (cards[i] === 11)
        return true
    }
    return false
    }

function outputSum(cards){
    cardsEl.textContent = "Cards: "
    let ace = false
    for (let i=0; i< cards.length; i++){
        cardsEl.textContent += cardset_symb[cards[i]] + " "
        if(cardset_val[cards[i]] === 11){
            ace = true
            sum[0][0] += cardset_val[cards[i]] - 10
            sum[0][1] += cardset_val[cards[i]]
        }else{
            sum[0][0] += cardset_val[cards[i]]
            sum[0][1] += cardset_val[cards[i]]
        }
    }
    if (ace === true && sum[0][1] < 21){
        sumEL.textContent = "Sum: " + sum[0][0] + "/" + sum[0][1]
    } else if (ace === true && sum[0][1] === 21){
        sumEL.textContent = "Sum: " + sum[0][1]
    }else{
        sumEL.textContent = "Sum: " + sum[0][0]
    }
    return sum
}

function newRoundBtnCapacity(){
    capacity = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
}