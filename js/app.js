/*
  TRAJECTOIRE — S13
  Recherche instantanée, filtres croisés, formulaire réactif et micro-interactions accessibles.
  La collection allRides reste toujours intacte ; les résultats sont recalculés à chaque interaction.
*/

const ridesList = document.querySelector("#rides-list");
const resultsCount = document.querySelector(".results-count");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#ride-search");
const filtersForm = document.querySelector("#filters-form");
const filtersPanel = document.querySelector("#filters-panel");
const filtersBackdrop = document.querySelector("#filters-backdrop");
const openFiltersButton = document.querySelector("#open-filters");
const closeFiltersButton = document.querySelector("#close-filters");
const activeFilterCount = document.querySelector("#active-filter-count");
const activeFiltersContainer = document.querySelector("#active-filters");
const filterFeedback = document.querySelector("#filter-feedback");

const regionFilter = document.querySelector("#region-filter");
const departureFilter = document.querySelector("#departure-filter");
const arrivalFilter = document.querySelector("#arrival-filter");
const arrivalField = document.querySelector("#arrival-field");
const arrivalError = document.querySelector("#arrival-error");
const durationFilter = document.querySelector("#duration-filter");
const distanceMin = document.querySelector("#distance-min");
const distanceMax = document.querySelector("#distance-max");
const distanceError = document.querySelector("#distance-error");
const routeFilter = document.querySelector("#route-filter");
const landscapeFilter = document.querySelector("#landscape-filter");

const tripTypeButtons = [...document.querySelectorAll("[data-trip-type]")];
const difficultyButtons = [...document.querySelectorAll("[data-difficulty]")];

let allRides = [];
let selectedTripType = "";
let selectedDifficulty = "";

function normalizeText(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function updateResultsCount(visible, total) {
  const totalLabel = total === 1 ? "itinéraire" : "itinéraires";
  resultsCount.innerHTML = `<strong>${visible}</strong> sur ${total} ${totalLabel}`;
}

function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;

  if (hours === 0) return `${remaining} min`;
  if (remaining === 0) return `${hours} h`;
  return `${hours} h ${String(remaining).padStart(2, "0")}`;
}

function renderRideCard(ride) {
  return `
    <article class="ride-card">
      <img
        class="ride-card__image"
        src="${ride.image}"
        alt="Illustration de ${ride.nom}"
      >

      <div class="ride-card__content">
        <h3>${ride.nom}</h3>

        <dl class="ride-card__details">
          <div>
            <dt>Distance</dt>
            <dd>${ride.distance} km</dd>
          </div>

          <div>
            <dt>Durée</dt>
            <dd>${formatDuration(ride.dureeMinutes)}</dd>
          </div>

          <div>
            <dt>Région</dt>
            <dd>${ride.regionPrincipale}</dd>
          </div>

          <div>
            <dt>Difficulté</dt>
            <dd>${ride.difficulte}</dd>
          </div>
        </dl>

        <a
          class="details-link"
          href="${ride.googleMaps}"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ouvrir l'itinéraire Google Maps de ${ride.nom}"
        >
          Plus de détails <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  `;
}

function getCurrentFilters() {
  return {
    search: normalizeText(searchInput.value),
    region: regionFilter.value,
    tripType: selectedTripType,
    departure: normalizeText(departureFilter.value),
    arrival: normalizeText(arrivalFilter.value),
    duration: durationFilter.value ? Number(durationFilter.value) : null,
    distanceMin: distanceMin.value === "" ? null : Number(distanceMin.value),
    distanceMax: distanceMax.value === "" ? null : Number(distanceMax.value),
    difficulty: selectedDifficulty,
    routeType: routeFilter.value,
    landscape: landscapeFilter.value
  };
}

function validateFilters() {
  let valid = true;
  arrivalError.textContent = "";
  distanceError.textContent = "";
  arrivalFilter.setCustomValidity("");
  distanceMax.setCustomValidity("");

  if (selectedTripType === "Aller simple" && !arrivalFilter.value.trim()) {
    arrivalError.textContent = "Indique un point d’arrivée pour un aller simple.";
    arrivalFilter.setCustomValidity("Point d’arrivée requis");
    valid = false;
  }

  if (
    distanceMin.value !== "" &&
    distanceMax.value !== "" &&
    Number(distanceMin.value) > Number(distanceMax.value)
  ) {
    distanceError.textContent = "La distance minimale doit être inférieure à la distance maximale.";
    distanceMax.setCustomValidity("Distance maximale invalide");
    valid = false;
  }

  return valid;
}

function matchesSearch(ride, query) {
  if (!query) return true;

  const searchableValues = [
    ride.nom,
    ride.regionPrincipale,
    ...(ride.regions || []),
    ride.depart,
    ride.arrivee,
    ...(ride.typesRoute || []),
    ...(ride.paysages || [])
  ];

  return searchableValues.some((value) => normalizeText(value).includes(query));
}

function applyFilters() {
  const filters = getCurrentFilters();

  const filteredRides = allRides.filter(function (ride) {
    const routeTypes = (ride.typesRoute || []).map(normalizeText);
    const landscapes = (ride.paysages || []).map(normalizeText);

    return (
      matchesSearch(ride, filters.search) &&
      (!filters.region || ride.regionPrincipale === filters.region) &&
      (!filters.tripType || ride.typeTrajet === filters.tripType) &&
      (!filters.departure || normalizeText(ride.depart).includes(filters.departure)) &&
      (!filters.arrival || normalizeText(ride.arrivee).includes(filters.arrival)) &&
      (!filters.duration || ride.dureeMinutes <= filters.duration) &&
      (filters.distanceMin === null || ride.distance >= filters.distanceMin) &&
      (filters.distanceMax === null || ride.distance <= filters.distanceMax) &&
      (!filters.difficulty || ride.difficulte === filters.difficulty) &&
      (!filters.routeType || routeTypes.includes(normalizeText(filters.routeType))) &&
      (!filters.landscape || landscapes.includes(normalizeText(filters.landscape)))
    );
  });

  renderRides(filteredRides);
  renderActiveFilters(filters);
  updateActiveFilterCount(filters);
}

function renderRides(rides) {
  updateResultsCount(rides.length, allRides.length);

  if (rides.length === 0) {
    ridesList.innerHTML = `
      <div class="state-message state-message--empty">
        <strong>Aucune balade ne correspond à tes critères.</strong>
        <span>Modifie les filtres ou réinitialise la recherche.</span>
        <button type="button" class="empty-reset" id="empty-reset">Réinitialiser les filtres</button>
      </div>
    `;

    document.querySelector("#empty-reset")?.addEventListener("click", resetAllFilters);
    return;
  }

  ridesList.innerHTML = rides.map(renderRideCard).join("");
}

function getActiveFilterLabels(filters) {
  const labels = [];

  if (filters.search) labels.push(`Recherche : ${searchInput.value.trim()}`);
  if (filters.region) labels.push(filters.region);
  if (filters.tripType) labels.push(filters.tripType);
  if (filters.departure) labels.push(`Départ : ${departureFilter.value.trim()}`);
  if (filters.arrival) labels.push(`Arrivée : ${arrivalFilter.value.trim()}`);
  if (filters.duration) labels.push(`≤ ${formatDuration(filters.duration)}`);
  if (filters.distanceMin !== null) labels.push(`≥ ${filters.distanceMin} km`);
  if (filters.distanceMax !== null) labels.push(`≤ ${filters.distanceMax} km`);
  if (filters.difficulty) labels.push(filters.difficulty);
  if (filters.routeType) labels.push(routeFilter.options[routeFilter.selectedIndex].text);
  if (filters.landscape) labels.push(landscapeFilter.options[landscapeFilter.selectedIndex].text);

  return labels;
}

function renderActiveFilters(filters) {
  const labels = getActiveFilterLabels(filters);

  if (labels.length === 0) {
    activeFiltersContainer.innerHTML = "";
    return;
  }

  activeFiltersContainer.innerHTML = `
    <span class="active-filters__label">Filtres actifs</span>
    ${labels.map((label) => `<span class="filter-chip">${label}</span>`).join("")}
    <button type="button" class="clear-filter-chips" id="clear-filter-chips">Tout effacer</button>
  `;

  document.querySelector("#clear-filter-chips")?.addEventListener("click", resetAllFilters);
}

function updateActiveFilterCount(filters) {
  const count = getActiveFilterLabels(filters).length;
  activeFilterCount.hidden = count === 0;
  activeFilterCount.textContent = count;
}

function setPressedButton(buttons, selectedButton) {
  buttons.forEach(function (button) {
    const isSelected = button === selectedButton;
    button.classList.toggle("is-active", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });
}

function updateArrivalVisibility() {
  const isLoop = selectedTripType === "Boucle";
  arrivalField.classList.toggle("is-hidden", isLoop);

  if (isLoop) {
    arrivalFilter.value = "";
    arrivalError.textContent = "";
    arrivalFilter.setCustomValidity("");
  }
}

function openFilters() {
  filtersPanel.classList.add("is-open");
  filtersBackdrop.hidden = false;
  requestAnimationFrame(() => filtersBackdrop.classList.add("is-visible"));
  openFiltersButton.setAttribute("aria-expanded", "true");
  document.body.classList.add("filters-open");
  filtersPanel.querySelector("select, input, button")?.focus();
}

function closeFilters() {
  filtersPanel.classList.remove("is-open");
  filtersBackdrop.classList.remove("is-visible");
  openFiltersButton.setAttribute("aria-expanded", "false");
  document.body.classList.remove("filters-open");

  window.setTimeout(function () {
    if (!filtersBackdrop.classList.contains("is-visible")) {
      filtersBackdrop.hidden = true;
    }
  }, 180);
}

function resetAllFilters() {
  filtersForm.reset();
  searchInput.value = "";
  selectedTripType = "";
  selectedDifficulty = "";
  setPressedButton(tripTypeButtons, tripTypeButtons[0]);
  setPressedButton(difficultyButtons, difficultyButtons[0]);
  updateArrivalVisibility();
  filterFeedback.textContent = "Filtres réinitialisés.";
  applyFilters();
}

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  applyFilters();
});

searchInput.addEventListener("input", applyFilters);

[
  regionFilter,
  departureFilter,
  arrivalFilter,
  durationFilter,
  distanceMin,
  distanceMax,
  routeFilter,
  landscapeFilter
].forEach(function (control) {
  control.addEventListener("input", function () {
    if (control === distanceMin || control === distanceMax || control === arrivalFilter) {
      validateFilters();
    }
    applyFilters();
  });

  control.addEventListener("change", applyFilters);
});

tripTypeButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    selectedTripType = button.dataset.tripType;
    setPressedButton(tripTypeButtons, button);
    updateArrivalVisibility();
    validateFilters();
    applyFilters();
  });
});

difficultyButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    selectedDifficulty = button.dataset.difficulty;
    setPressedButton(difficultyButtons, button);
    applyFilters();
  });
});

filtersForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!validateFilters()) {
    filterFeedback.textContent = "Vérifie les champs signalés avant d’appliquer les filtres.";
    filtersForm.querySelector(":invalid")?.focus();
    return;
  }

  filterFeedback.textContent = "Filtres appliqués.";
  applyFilters();
  closeFilters();
});

filtersForm.addEventListener("reset", function () {
  window.setTimeout(function () {
    selectedTripType = "";
    selectedDifficulty = "";
    setPressedButton(tripTypeButtons, tripTypeButtons[0]);
    setPressedButton(difficultyButtons, difficultyButtons[0]);
    updateArrivalVisibility();
    filterFeedback.textContent = "Filtres réinitialisés.";
    applyFilters();
  }, 0);
});

openFiltersButton.addEventListener("click", openFilters);
closeFiltersButton.addEventListener("click", closeFilters);
filtersBackdrop.addEventListener("click", closeFilters);

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && filtersPanel.classList.contains("is-open")) {
    closeFilters();
    openFiltersButton.focus();
  }
});

ridesList.innerHTML = '<p class="state-message">Chargement des balades...</p>';

fetch("./data.json")
  .then(function (response) {
    if (!response.ok) {
      throw new Error("Erreur HTTP : " + response.status);
    }

    return response.json();
  })
  .then(function (rides) {
    if (!Array.isArray(rides)) {
      throw new Error("Le fichier data.json ne contient pas un tableau.");
    }

    allRides = rides;
    updateArrivalVisibility();
    applyFilters();
  })
  .catch(function (error) {
    console.error("Détail technique :", error);

    ridesList.innerHTML = `
      <p class="state-message state-message--error">
        Impossible de charger les balades. Vérifie ta connexion puis réessaie.
      </p>
    `;
    updateResultsCount(0, 0);
  });


// Formulaire de proposition : S12 — submit intercepté sans rechargement.
const contactForm = document.querySelector("#form-contact");
const nameInput = document.querySelector("#champ-nom");
const messageInput = document.querySelector("#champ-message");
const nameError = document.querySelector("#nom-error");
const messageError = document.querySelector("#message-error");
const confirmation = document.querySelector("#confirmation");

function validateContactForm() {
  let valid = true;
  const name = nameInput.value.trim();
  const message = messageInput.value.trim();

  nameError.textContent = "";
  messageError.textContent = "";
  nameInput.setCustomValidity("");
  messageInput.setCustomValidity("");

  if (name.length < 2) {
    nameError.textContent = "Indique au moins 2 caractères.";
    nameInput.setCustomValidity("Nom trop court");
    valid = false;
  }

  if (message.length < 10) {
    messageError.textContent = "Décris la proposition en au moins 10 caractères.";
    messageInput.setCustomValidity("Message trop court");
    valid = false;
  }

  return valid;
}

[nameInput, messageInput].forEach(function (field) {
  field.addEventListener("input", function () {
    confirmation.hidden = true;
    validateContactForm();
  });
});

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!validateContactForm()) {
    contactForm.querySelector(":invalid")?.focus();
    return;
  }

  confirmation.hidden = false;
  contactForm.reset();
  nameInput.setCustomValidity("");
  messageInput.setCustomValidity("");
});
