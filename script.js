
let karten = document.querySelectorAll(".karte");
let kartenArray = [...karten];

function kartenMischen() {
    kartenArray.forEach((karte) => {
        let randomIndex = Math.floor(Math.random() * kartenArray.length);
        karte.style.order = randomIndex;
        karte.children[1].style.backgroundImage = `url(${karte.getAttribute(
            "data-bild"
        )})`;
    });
}

let gewendeteKarte = false;
let gerateneKarte = false;
let ersteKarte;
let zweiteKarte;

gefundeneKartenArray = [];

function karteWenden() {
    if (gerateneKarte) return;
    this.classList.add("gewendet");
    if (this === ersteKarte) return;
    if (!gewendeteKarte) {
        gewendeteKarte = true;
        ersteKarte = this;
        return;
    }
    zweiteKarte = this;
    paarChecken();
}

function paarChecken() {
    let uebereinstimmung = ersteKarte.dataset.bild === zweiteKarte.dataset.bild;
    if (uebereinstimmung) {
        kartenFixieren();
        gefundeneKartenArray.push(ersteKarte, zweiteKarte);
        if (gefundeneKartenArray.length == 16) {
            endBenachrichtigung()
        }
    } else {
        umdrehen();
    }
}

function kartenFixieren() {
    ersteKarte.removeEventListener("click", karteWenden);
    zweiteKarte.removeEventListener("click", karteWenden);
    zuruecksetzen();
    highscoreHoch();
}

function umdrehen() {
    gerateneKarte = true;
    highscoreRunter();

    setTimeout(() => {
        ersteKarte.classList.remove("gewendet");
        zweiteKarte.classList.remove("gewendet");
        zuruecksetzen();
    }, 3000);
}

function zuruecksetzen() {
    gewendeteKarte = false;
    gerateneKarte = false;
    ersteKarte = null;
    zweiteKarte = null;
}

highscore = 0;
highscoreFeld = document.getElementById("highscore");

function highscoreHoch() {
    highscore += 1000;
    highscoreFeld.innerHTML = highscore;
}

function highscoreRunter() {
    if (highscore >= 500) {
        highscore = highscore - 500;
        highscoreFeld.innerHTML = highscore;
    }
}

function neustarten() {
    highscoreFeld.innerHTML = 0;
    highscore = 0;
    endNachricht.style.display = "none";
    gefundeneKartenArray = [];
    zuruecksetzen();
    kartenArray.forEach((karte) => {
        karte.classList.remove("gewendet");
        karte.removeEventListener("click", karteWenden);
    });
    setTimeout(() => { starten() }, 1000);
}

let endNachricht = document.getElementById("ende");
let endhighscore = document.getElementById("endhighscore");

function endBenachrichtigung() {
    endhighscore.innerHTML = highscore;
    endNachricht.style.display = "block";
}

function starten() {
    kartenMischen();
    karten.forEach((karte) => karte.addEventListener("click", karteWenden));
    highscoreFeld.innerHTML = 0;
}

starten();