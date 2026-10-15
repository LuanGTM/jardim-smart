const plantCatalog = [
  { id: "orquidea", name: "Orquídea", icon: "🌸", category: "Flor tropical", location: "Varanda", light: "Meia-sombra", interval: 7, offset: 0, tip: "Use pouca água e evite deixar água acumulada no vaso." },
  { id: "manjericao", name: "Manjericão", icon: "🌿", category: "Erva", location: "Cozinha", light: "Sol indireto", interval: 3, offset: 1, tip: "Confira a terra com frequência; ervas em vaso podem secar mais rápido." },
  { id: "jiboia", name: "Jiboia", icon: "🍃", category: "Folhagem", location: "Sala", light: "Luz indireta", interval: 8, offset: 2, tip: "Espere a superfície do substrato começar a secar antes de regar." },
  { id: "suculenta", name: "Suculenta", icon: "🪴", category: "Suculenta", location: "Janela", light: "Luz forte", interval: 14, offset: 3, tip: "Regue somente quando o substrato estiver seco." },
  { id: "samambaia", name: "Samambaia", icon: "🌱", category: "Folhagem", location: "Varanda", light: "Meia-sombra", interval: 7, offset: 4, tip: "Prefere substrato levemente úmido, sem encharcar." },
  { id: "espada", name: "Espada-de-são-jorge", icon: "🪴", category: "Folhagem", location: "Sala", light: "Luz indireta", interval: 14, offset: 5, tip: "Tolera períodos mais secos; evite excesso de água." },
  { id: "lirio", name: "Lírio-da-paz", icon: "🌼", category: "Flor tropical", location: "Sala", light: "Meia-sombra", interval: 7, offset: 6, tip: "Observe as folhas e a umidade da terra antes de regar." },
  { id: "cacto", name: "Cacto", icon: "🌵", category: "Suculenta", location: "Janela", light: "Sol direto", interval: 21, offset: 0, tip: "Espere o substrato secar completamente entre regas." },
  { id: "costela", name: "Costela-de-adão", icon: "🌿", category: "Folhagem", location: "Sala", light: "Luz indireta", interval: 8, offset: 0, tip: "Confira os primeiros centímetros da terra antes de regar." },
];

const initialPlantIds = ["orquidea", "manjericao", "jiboia", "suculenta", "samambaia", "espada", "lirio"];
const storageKey = "jardim-smart-demo-plants";
const garden = document.querySelector("#plant-garden");
const calendar = document.querySelector("#watering-calendar");
const gardenHint = document.querySelector(".garden-hint");
const plantDialog = document.querySelector(".plant-dialog:not(.add-dialog)");
const addDialog = document.querySelector(".add-dialog");
const plantSelect = document.querySelector("#plant-select");
const waterButton = document.querySelector("#water-plant-button");
let selectedPlantId = null;

function dateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function dateFromKey(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function addDays(value, days) {
  const date = dateFromKey(value);
  date.setDate(date.getDate() + days);
  return dateKey(date);
}

function daysBetween(first, second) {
  return Math.round((dateFromKey(second) - dateFromKey(first)) / 86400000);
}

function formatDate(value, options = { day: "numeric", month: "long" }) {
  return new Intl.DateTimeFormat("pt-BR", options).format(dateFromKey(value));
}

function makeInitialPlants() {
  const today = dateKey(new Date());
  return initialPlantIds.map((id) => {
    const species = plantCatalog.find((item) => item.id === id);
    return { id, lastWatered: addDays(today, species.offset - species.interval) };
  });
}

function loadPlants() {
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored === null) return makeInitialPlants();
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return makeInitialPlants();
    const seen = new Set();
    return parsed.filter((plant) => {
      const valid = plantCatalog.some((item) => item.id === plant.id)
        && typeof plant.lastWatered === "string"
        && !seen.has(plant.id);
      seen.add(plant.id);
      return valid;
    });
  } catch {
    return makeInitialPlants();
  }
}

let plants = loadPlants();

function savePlants() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(plants));
  } catch {
    gardenHint.textContent = "O navegador não permitiu salvar as alterações.";
  }
}

function getSpecies(plant) {
  return plantCatalog.find((species) => species.id === plant.id);
}

function getNextWaterDate(plant) {
  return addDays(plant.lastWatered, getSpecies(plant).interval);
}

function getPlantStatus(plant, today = dateKey(new Date())) {
  const nextWater = getNextWaterDate(plant);
  if (plant.lastWatered === today) return { label: "Regada hoje", state: "watered" };
  if (nextWater < today) return { label: "Atrasada", state: "overdue" };
  if (nextWater === today) return { label: "Precisa regar", state: "due" };
  return { label: "Em dia", state: "ready" };
}

function createEmptyPlot(index) {
  const button = document.createElement("button");
  button.className = "interactive-plot is-empty";
  button.type = "button";
  button.setAttribute("role", "gridcell");
  button.setAttribute("aria-label", `Adicionar uma planta ao canteiro ${index + 1}`);
  button.innerHTML = '<span class="plot-icon" aria-hidden="true">+</span>';
  button.addEventListener("click", openAddDialog);
  return button;
}

function createPlantPlot(plant, index) {
  const species = getSpecies(plant);
  const status = getPlantStatus(plant);
  const button = document.createElement("button");
  button.className = `interactive-plot is-planted is-${status.state}`;
  button.type = "button";
  button.setAttribute("role", "gridcell");
  button.setAttribute("aria-label", `${species.name}, ${status.label}. Abrir detalhes.`);
  button.innerHTML = `<span class="plot-icon" aria-hidden="true">${species.icon}</span><small>${species.name}</small><span class="plot-status">${status.label}</span>`;
  button.addEventListener("click", () => openPlantDialog(plant.id));
  return button;
}

function renderGarden() {
  garden.replaceChildren();
  for (let index = 0; index < 9; index += 1) {
    const plant = plants[index];
    garden.append(plant ? createPlantPlot(plant, index) : createEmptyPlot(index));
  }
  updateHeroAlert();
}

function renderCalendar() {
  const today = dateKey(new Date());
  const upcoming = plants.map((plant) => ({ plant, due: getNextWaterDate(plant) }));
  calendar.replaceChildren();

  for (let dayOffset = 0; dayOffset < 7; dayOffset += 1) {
    const day = addDays(today, dayOffset);
    const dayCard = document.createElement("article");
    dayCard.className = `calendar-day${dayOffset === 0 ? " is-today" : ""}`;
    const heading = document.createElement("div");
    heading.className = "calendar-day-heading";
    const weekday = document.createElement("strong");
    weekday.textContent = dayOffset === 0 ? "Hoje" : formatDate(day, { weekday: "short" }).replace(".", "");
    const date = document.createElement("small");
    date.textContent = formatDate(day, { day: "2-digit", month: "short" });
    heading.append(weekday, date);
    const events = document.createElement("div");
    events.className = "calendar-events";

    const dayPlants = upcoming.filter((item) => item.due <= day && (dayOffset === 0 || item.due === day));
    if (dayPlants.length === 0) {
      const empty = document.createElement("span");
      empty.className = "calendar-empty";
      empty.textContent = "Sem regas";
      events.append(empty);
    }
    dayPlants.forEach(({ plant }) => {
      const species = getSpecies(plant);
      const event = document.createElement("button");
      event.className = "calendar-event";
      event.type = "button";
      event.setAttribute("aria-label", `Ver ${species.name}, rega ${getPlantStatus(plant).label.toLowerCase()}`);
      event.innerHTML = `<span aria-hidden="true">${species.icon}</span><span>${species.name}</span>`;
      event.addEventListener("click", () => openPlantDialog(plant.id));
      events.append(event);
    });
    dayCard.append(heading, events);
    calendar.append(dayCard);
  }
}

function updateHeroAlert() {
  const orchid = plants.find((plant) => plant.id === "orquidea");
  const title = document.querySelector("#hero-alert-title");
  const copy = document.querySelector("#hero-alert-copy");
  const icon = document.querySelector("#hero-alert-icon");
  const alert = document.querySelector(".garden-alert");
  if (!orchid) {
    title.textContent = "Seu jardim está crescendo";
    copy.textContent = "Adicione uma planta para começar.";
    icon.textContent = "🌱";
    alert.style.background = "var(--yellow)";
    return;
  }
  const status = getPlantStatus(orchid);
  title.textContent = `Orquídea · ${status.label}`;
  copy.textContent = status.state === "watered"
    ? `Próxima rega: ${formatDate(getNextWaterDate(orchid))}.`
    : status.state === "due" || status.state === "overdue"
      ? "Confira a terra e marque quando regar."
      : `Próxima rega: ${formatDate(getNextWaterDate(orchid))}.`;
  icon.textContent = status.state === "watered" ? "✓" : "💧";
  alert.style.background = status.state === "watered" ? "#d9edbb" : "var(--yellow)";
}

function openPlantDialog(plantId) {
  const plant = plants.find((item) => item.id === plantId);
  if (!plant) return;
  const species = getSpecies(plant);
  const status = getPlantStatus(plant);
  const nextWater = getNextWaterDate(plant);
  selectedPlantId = plantId;
  document.querySelector("#plant-location").textContent = `CANTEIRO ${String(plants.indexOf(plant) + 1).padStart(2, "0")} · EXEMPLO`;
  document.querySelector("#plant-emoji").textContent = species.icon;
  document.querySelector("#dialog-title").firstChild.textContent = `${species.name} `;
  const statusLabel = document.querySelector("#plant-status");
  statusLabel.textContent = status.label;
  statusLabel.className = `plant-status is-${status.state}`;
  document.querySelector("#plant-meta").textContent = `${species.category} · ${species.location} · ${species.light}`;
  document.querySelector("#care-note-text").innerHTML = `<strong>${status.state === "watered" ? "Rega registrada." : status.state === "due" || status.state === "overdue" ? "Regue quando a terra precisar." : "Sua planta está em dia."}</strong><br>${species.tip}`;
  document.querySelector("#next-water-date").textContent = formatDate(nextWater);
  const daysUntil = daysBetween(dateKey(new Date()), nextWater);
  document.querySelector("#next-water-countdown").textContent = daysUntil < 0
    ? `Atrasada há ${Math.abs(daysUntil)} dia(s).`
    : daysUntil === 0
      ? status.state === "watered" ? "Regada hoje; este é o próximo intervalo." : "Prevista para hoje; confira a terra."
      : `Em aproximadamente ${daysUntil} dia(s), se as condições se mantiverem.`;
  waterButton.disabled = status.state === "watered";
  waterButton.textContent = status.state === "watered" ? "Regada hoje ✓" : "Marcar como regada";
  if (!plantDialog.open) plantDialog.showModal();
}

function updatePlantOptions() {
  const available = plantCatalog.filter((species) => !plants.some((plant) => plant.id === species.id));
  plantSelect.replaceChildren();
  available.forEach((species) => {
    const option = document.createElement("option");
    option.value = species.id;
    option.textContent = `${species.icon} ${species.name} · rega a cada ${species.interval} dias`;
    plantSelect.append(option);
  });
  document.querySelector(".add-plant-button").disabled = plants.length >= 9 || available.length === 0;
  gardenHint.textContent = available.length === 0
    ? "Todas as espécies da demonstração já estão no jardim."
    : "Escolha um canteiro vazio para adicionar outra espécie.";
}

function openAddDialog() {
  if (plants.length >= 9) {
    gardenHint.textContent = "Os nove canteiros já estão ocupados.";
    return;
  }
  updatePlantOptions();
  if (!addDialog.open) addDialog.showModal();
}

document.querySelectorAll(".dialog-close").forEach((button) => {
  button.addEventListener("click", () => button.closest("dialog").close());
});

document.querySelectorAll("dialog").forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
});

waterButton.addEventListener("click", () => {
  const plant = plants.find((item) => item.id === selectedPlantId);
  if (!plant) return;
  plant.lastWatered = dateKey(new Date());
  savePlants();
  renderGarden();
  renderCalendar();
  openPlantDialog(plant.id);
  gardenHint.textContent = `${getSpecies(plant).name} regada. Próxima rega prevista para ${formatDate(getNextWaterDate(plant))}.`;
});

document.querySelector("#remove-plant-button").addEventListener("click", () => {
  const plant = plants.find((item) => item.id === selectedPlantId);
  if (!plant) return;
  const plantName = getSpecies(plant).name;
  plants = plants.filter((item) => item.id !== selectedPlantId);
  selectedPlantId = null;
  savePlants();
  renderGarden();
  renderCalendar();
  plantDialog.close();
  gardenHint.textContent = `${plantName} removida do jardim. O canteiro está livre.`;
});

document.querySelector(".add-plant-button").addEventListener("click", () => {
  const species = plantCatalog.find((item) => item.id === plantSelect.value);
  if (!species || plants.length >= 9) return;
  const today = dateKey(new Date());
  plants.push({ id: species.id, lastWatered: addDays(today, -species.interval) });
  savePlants();
  renderGarden();
  renderCalendar();
  addDialog.close();
  gardenHint.textContent = `${species.name} adicionada ao jardim. Toque nela para ver a próxima rega.`;
});

renderGarden();
renderCalendar();