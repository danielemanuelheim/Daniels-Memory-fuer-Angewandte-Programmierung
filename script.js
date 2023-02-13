
let cards = document.querySelectorAll(".card");
let cardsArray = [...cards];

function shuffleCards() {
    cardsArray.forEach((card) => {
        let randomIndex = Math.floor(Math.random() * cardsArray.length);
        card.style.order = randomIndex;
        card.children[1].style.backgroundImage = `url(${card.getAttribute(
            "data-image"
        )})`;
    });
}

let flippedCard = false;
let guessedCard = false;
let firstCard;
let secondCard;

foundCardsArray = [];

function flipCard() {
    this.classList.add("flipped");
    if (guessedCard) return;
    if (this === firstCard) return;
    if (!flippedCard) {
        flippedCard = true;
        firstCard = this;
        return;
    }
    secondCard = this;
    checkPair();
}

function checkPair() {
    let match = firstCard.dataset.image === secondCard.dataset.image;
    if (match) {
        fixCards();
        foundCardsArray.push(firstCard, secondCard);
        if (foundCardsArray.length == 16) {
            endingMessage()
        }
    } else {
        flipBack();
        cards.forEach((card) => card.removeEventListener("click", flipCard));
        setTimeout(() => {
            remainingCards = document.querySelectorAll('div[data-state="unfound"]');
            remainingCards.forEach((card) => card.addEventListener("click", flipCard));
        }, 3000);
    }
}

function fixCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    firstCard.setAttribute('data-state', "found");
    secondCard.setAttribute('data-state', "found");
    reset();
    highscoreUp();
}

function flipBack() {
    guessedCard = true;
    highscoreDown();

    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        reset();
    }, 3000);
}

function reset() {
    flippedCard = false;
    guessedCard = false;
    firstCard = null;
    secondCard = null;
}

highscore = 0;
highscoreContainer = document.getElementById("highscore");

function highscoreUp() {
    highscore += 1000;
    highscoreContainer.innerHTML = highscore;
}

function highscoreDown() {
    if (highscore >= 500) {
        highscore = highscore - 500;
        highscoreContainer.innerHTML = highscore;
    }
}

function restart() {
    highscoreContainer.innerHTML = 0;
    highscore = 0;
    message.style.display = "none";
    foundCardsArray = [];
    reset();
    cardsArray.forEach((card) => {
        card.classList.remove("flipped");
        card.removeEventListener("click", flipCard);
        card.setAttribute('data-state', "unfound");
    });
    setTimeout(() => { start() }, 1000);
}

let message = document.getElementById("end");
let endingHighscore = document.getElementById("endinghighscore");

function endingMessage() {
    endingHighscore.innerHTML = highscore;
    message.style.display = "block";
}

function start() {
    shuffleCards();
    cards.forEach((card) => card.addEventListener("click", flipCard));
    highscoreContainer.innerHTML = 0;
}

start();

// done