
document.addEventListener("DOMContentLoaded", () => {
  const cardContainer = document.getElementById("card-container");
  let currentMode = "closed";
  let selectedCards = [];
  let showingSelection = false;

  function renderCards() {
    cardContainer.innerHTML = "";
    cards.forEach((card, index) => {
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("card");
      if (currentMode === "open") {
        cardDiv.classList.add(card.orientation);
        const img = document.createElement("img");
        img.src = card.src;
        img.alt = "Card";
        cardDiv.appendChild(img);
      } else {
        cardDiv.classList.add("portrait");
        const img = document.createElement("img");
        img.src = "back.png";
        img.alt = "Back";
        cardDiv.appendChild(img);
      }

      cardDiv.addEventListener("click", () => {
        if (showingSelection) return;
        focusCard(card, index);
      });

      cardContainer.appendChild(cardDiv);
    });
  }

  function focusCard(card, index) {
    const focusOverlay = document.createElement("div");
    focusOverlay.classList.add("focus-overlay");

    const focusCard = document.createElement("div");
    focusCard.classList.add("focus-card", card.orientation);
    const img = document.createElement("img");
    img.src = currentMode === "open" ? card.src : "back.png";
    img.alt = "Focused Card";
    focusCard.appendChild(img);

    const controls = document.createElement("div");
    controls.classList.add("focus-controls");

    const selectBtn = document.createElement("button");
    selectBtn.textContent = "Обрати цю картку";
    selectBtn.addEventListener("click", () => {
      if (selectedCards.length >= 5) {
        alert("Ви досягли ліміту в 5 карток.");
      } else if (!selectedCards.includes(index)) {
        selectedCards.push(index);
        showSelectionButtons();
      }
      focusOverlay.remove();
    });

    const closeBtn = document.createElement("button");
    closeBtn.textContent = "Повернутися до всіх карток";
    closeBtn.addEventListener("click", () => focusOverlay.remove());

    controls.appendChild(selectBtn);
    controls.appendChild(closeBtn);

    focusOverlay.appendChild(focusCard);
    focusOverlay.appendChild(controls);
    document.body.appendChild(focusOverlay);
  }

  function showSelectionButtons() {
    document.querySelector(".show-selection-btn").style.display = "inline-block";
    document.querySelector(".finish-selection-btn").style.display = "inline-block";
    document.querySelector(".clear-selection-btn").style.display = "inline-block";
  }

  function hideSelectionButtons() {
    document.querySelector(".show-selection-btn").style.display = "none";
    document.querySelector(".finish-selection-btn").style.display = "none";
    document.querySelector(".clear-selection-btn").style.display = "none";
  }

  function showSelection() {
    cardContainer.innerHTML = "";
    showingSelection = true;
    selectedCards.forEach(index => {
      const card = cards[index];
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("card", card.orientation);
      const img = document.createElement("img");
      img.src = card.src;
      img.alt = "Selected Card";
      cardDiv.appendChild(img);
      cardDiv.addEventListener("click", () => focusCard(card, index));
      cardContainer.appendChild(cardDiv);
    });
  }

  function finalizeSelection() {
    showSelection();
  }

  function clearSelection() {
    selectedCards = [];
    showingSelection = false;
    hideSelectionButtons();
    renderCards();
  }

  function switchMode(mode) {
    currentMode = mode;
    showingSelection = false;
    renderCards();
  }

  function shuffleCards() {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    renderCards();
  }

  function autoSelect() {
    selectedCards = [];
    while (selectedCards.length < 3) {
      const index = Math.floor(Math.random() * cards.length);
      if (!selectedCards.includes(index)) {
        selectedCards.push(index);
      }
    }
    showSelectionButtons();
    showSelection();
  }

  function showAllCards() {
    selectedCards = [];
    showingSelection = false;
    hideSelectionButtons();
    renderCards();
  }

  document.querySelector(".view-mode-select").addEventListener("change", (e) => switchMode(e.target.value));
  document.querySelector(".shuffle-btn").addEventListener("click", shuffleCards);
  document.querySelector(".auto-select-btn").addEventListener("click", autoSelect);
  document.querySelector(".show-selection-btn").addEventListener("click", showSelection);
  document.querySelector(".finish-selection-btn").addEventListener("click", finalizeSelection);
  document.querySelector(".clear-selection-btn").addEventListener("click", clearSelection);
  document.querySelector(".show-all-btn").addEventListener("click", showAllCards);

  renderCards();
});
