
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

function karteWenden() {
    this.classList.add("gewendet")
}

function starten() {
    kartenMischen();
    karten.forEach((karte) => karte.addEventListener("click", karteWenden));
}

starten();