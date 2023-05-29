let player = {
    cards: [],
    cash: 200
}

let dealer = {
    cards: []
}

//let cards = []
let total = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let totalEl = document.getElementById("total-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")

playerEl.textContent = player.name + ": $" + player.cash

function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function startGame() {
    isAlive = true
    hasBlackJack = false
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    player.cards = [firstCard, secondCard]
    total = firstCard + secondCard
    renderGame()
}

function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < player.cards.length; i++) {
        cardsEl.textContent += player.cards[i] + " "
    }
    
    totalEl.textContent = "Total: " + total
    if (total <= 20) {
        message = "Do you want to draw a new card?"
    } else if (total === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
    } else {
        message = "You're out of the game!"
        isAlive = false
    }
    messageEl.textContent = message
}


function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        total += card
        player.cards.push(card)
        renderGame()        
    }
}
