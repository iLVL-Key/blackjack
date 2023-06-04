const version = "1.1.11"
const versionEl = document.getElementById("version-el").textContent = "Version " + version

let player = {
    cards: [],
    total: 0,
    cash: 200,
    wager: 20
}

let dealer = {
    cards: [],
    total: 0
}

let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let rules1El = document.getElementById("rules1-el")
let rules2El = document.getElementById("rules2-el")
let rules3El = document.getElementById("rules3-el")
let dealerHeaderEl = document.getElementById("dealerHeader-el")
let dealerCardsEl = document.getElementById("dealerCards-el")
let dealerTotalEl = document.getElementById("dealerTotal-el")
let playerHeaderEl = document.getElementById("playerHeader-el")
let playerCardsEl = document.getElementById("playerCards-el")
let playerTotalEl = document.getElementById("playerTotal-el")
let playerCashEl = document.getElementById("playerCash-el").textContent = "Cash: $" + player.cash

//GENERATE A NEW CARD
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

//START THE GAME
function startGame() {
    isAlive = true
    hasBlackJack = false
    let playerFirstCard = getRandomCard()
    let playerSecondCard = getRandomCard()
    player.cards = [playerFirstCard, playerSecondCard]
    player.total = playerFirstCard + playerSecondCard
    let dealerFirstCard = getRandomCard()
    let dealerSecondCard = getRandomCard()
    dealer.cards = [dealerFirstCard, dealerSecondCard]
    dealer.total = dealerFirstCard + dealerSecondCard
    dealerHeaderEl.textContent = "Dealer Cards"
    playerHeaderEl.textContent = "Your Cards"
    dealerTotalEl.textContent = ""
    rules1El.textContent = ""
    rules2El.textContent = ""
    rules3El.textContent = ""
    player.cash -= 20
    renderGame()
}

//RENDER THE TABLE
function renderGame() {
    playerCardsEl.textContent = ""
    for (let i = 0; i < player.cards.length; i++) {
        playerCardsEl.textContent += "[" + player.cards[i] + "] "
    }
    
    playerTotalEl.textContent = "Total: " + player.total
    if (player.total <= 20) {
        message = "Hit or Stand?"
    } else if (player.total === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
    } else {
        message = "You bust!"
        isAlive = false
    }
    messageEl.textContent = message
    playerCashEl.textContent = "Cash: $" + player.cash

    dealerTotalEl.textContent = "Total: ?"
    dealerCardsEl.textContent = "[?] [" + dealer.cards[1] + "] " //the dealers first card is always hidden, we're only showing the second card (index 1)

    // for (let i = 0; i < dealer.cards.length; i++) {
    //     console.log("Dealer Card " + i +": " + dealer.cards[i])
    // }
}

//DRAW A NEW CARD FOR THE PLAYER (HIT)
function playerNewCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        player.total += card
        player.cards.push(card)
        renderGame()        
    }
}

//DRAW A NEW CARD FOR THE DEALER
function dealerNewCard() {
    let card = getRandomCard()
    dealer.total += card
    dealer.cards.push(card)
    renderGame()        
}

//REVEAL THE DEALERS CARDS
function revealDealerCards() {
    dealerCardsEl.textContent = ""
    for (let i = 0; i < dealer.cards.length; i++) { //start at index 0 because we want to show all the dealers cards now
        dealerCardsEl.textContent += "[" + dealer.cards[i] + "] "
    }
    dealerTotalEl.textContent = "Total: " + dealer.total
}

//END THE GAME (STAND)
function endGame() {
    if (isAlive === true) {             //you have not busted
        if (dealer.total < 17) {        //if the dealer is under 17, draw a new card ("Dealer must stand on 17")
            do {
                dealerNewCard()
            }
            while (dealer.total <16)    //keep drawing a new card if the dealer is under 16 ("must draw to 16")
        }
        //if dealer busts:
        if (dealer.total > 21) {                        //dealer has busted
            if (player.total === 21) {                  //and you have blackjack
                message = "Blackjack! Dealer busts!"
                player.cash += player.wager * 2.5       //-payout equals 2.5 of your wager (your wager back, plus 150% of your wager as your winnings, "blackjack pays 3to2")
            } else {                                    //and you don't have blackjack
                message = "Dealer busts! You win!"
                player.cash += player.wager * 2         //-payout equals double your wager (your wager back, plus an equal amount as your winnings)
            }
        //if dealer is higher than you: lose your wager/no payout
        } else if (dealer.total > player.total) {
            message = "Dealer wins!"
        //if dealer total is equal to your total:
        } else if (dealer.total === player.total) {
            message = "Push!"
            player.cash += player.wager                 //payout equals wager (you get your wager back, with no winnings)
        //if dealer total is less than your total:
        } else {
            if (player.total === 21) {                  //and you have blackjack
                message = "Blackjack! Dealer busts!"
                player.cash += player.wager * 2.5       //-payout equals 2.5 of your wager (your wager back, plus 150% of your wager as your winnings, "blackjack pays 3to2")
            } else {                                    //and you don't have blackjack
                message = "You win!"
                player.cash += player.wager * 2         //-payout equals double your wager (your wager back, plus an equal amount as your winnings)
            }
        }
        messageEl.textContent = message
        playerCashEl.textContent = "Cash: $" + player.cash
        revealDealerCards()             //Once the dealer is finished, reveal their cards
        isAlive = false
    }
}