
// Final logic.js

let selectedCards = [];
let currentMode = "closed";
const cardContainer = document.getElementById("card-container");
const focusContainer = document.getElementById("focus-container");
const focusCard = document.getElementById("focus-card");
const focusImage = document.getElementById("focus-image");
const selectBtn = document.getElementById("select-card-btn");
const returnBtn = document.getElementById("return-btn");
const showSelectionBtn = document.querySelectorAll(".show-selection-btn");
const finishSelectionBtn = document.querySelectorAll(".finish-selection-btn");
const clearSelectionBtn = document.querySelectorAll(".clear-selection-btn");

function shuffleCards() {
  cards.sort(() => 0.5 - Math.random());
  renderCards();
}

function switchMode(mode) {
  currentMode = mode;
  renderCards();
}

function showAllCards() {
  selectedCards = [];
  renderCards();
  updateControls();
}

function updateControls() {
  const show = selectedCards.length > 0;
  showSelectionBtn.forEach(btn => btn.style.display = show ? "inline-block" : "none");
  finishSelectionBtn.forEach(btn => btn.style.display = show ? "inline-block" : "none");
  clearSelectionBtn.forEach(btn => btn.style.display = show ? "inline-block" : "none");
}

function renderCards() {
  cardContainer.innerHTML = "";
  cards.forEach((card, index) => {
    const div = document.createElement("div");
    div.className = "card";
    if (currentMode === "open") {
      div.classList.add(card.orientation);
      div.style.backgroundImage = `url(${card.src})`;
    } else {
      div.classList.add("portrait");
      div.style.backgroundImage = `url(back.png)`;
    }

    div.addEventListener("click", () => handleCardClick(card, index));
    if (currentMode === "closed") {
      div.addEventListener("mouseover", () => div.classList.add("hovered"));
      div.addEventListener("mouseout", () => div.classList.remove("hovered"));
    }
    cardContainer.appendChild(div);
  });
}

function handleCardClick(card, index) {
  if (selectedCards.length >= 5 && !selectedCards.includes(card)) {
    alert("Максимум 5 карток.");
    return;
  }

  focusImage.src = currentMode === "closed" ? "back.png" : card.src;
  focusImage.className = card.orientation;
  focusContainer.classList.add("active");

  selectBtn.onclick = () => {
    if (!selectedCards.includes(card)) selectedCards.push(card);
    focusContainer.classList.remove("active");
    updateControls();
  };

  returnBtn.onclick = () => {
    focusContainer.classList.remove("active");
  };
}

function showSelection() {
  cardContainer.innerHTML = "";
  selectedCards.forEach(card => {
    const div = document.createElement("div");
    div.className = "card " + card.orientation;
    div.style.backgroundImage = `url(${card.src})`;
    div.addEventListener("click", () => handleCardClick(card));
    cardContainer.appendChild(div);
  });
}

function finalizeSelection() {
  showSelection();
}

function clearSelection() {
  selectedCards = [];
  renderCards();
  updateControls();
}

function autoSelect() {
  selectedCards = [];
  const shuffled = [...cards].sort(() => 0.5 - Math.random()).slice(0, 3);
  selectedCards.push(...shuffled);
  showSelection();
  updateControls();
}

document.addEventListener("DOMContentLoaded", () => {
  renderCards();
  updateControls();
});
