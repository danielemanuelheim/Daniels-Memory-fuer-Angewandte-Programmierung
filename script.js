
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

function karteWenden() {
  this.classList.add("gewendet");
  if (gerateneKarte) return;
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
  } else {
    umdrehen();
  }
}

function kartenFixieren() {
  ersteKarte.removeEventListener("click", karteWenden);
  zweiteKarte.removeEventListener("click", karteWenden);
  zuruecksetzen();
}

function umdrehen() {
  gerateneKarte = true;

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

function starten() {
    kartenMischen();
    karten.forEach((karte) => karte.addEventListener("click", karteWenden));
}

starten();