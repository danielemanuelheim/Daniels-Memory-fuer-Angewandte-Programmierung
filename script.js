
let karten = document.querySelectorAll(".karte");

function karteWenden() {
    this.classList.add("gewendet")
}

function starten() {
    karten.forEach((karte) => karte.addEventListener("click", karteWenden));
}

starten();