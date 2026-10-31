const plants = {
  manjericao: {
    name: "Manjericão", icon: "🌿", initialMoisture: 34, threshold: 38, temperature: 24.6, soilTemperature: 22.1, airHumidity: 58,
    location: "VARANDA", light: "Sol indireto", water: 0.35, interval: 3, nextWaterDays: 2, harvest: "Em 45–60 dias",
    category: "Erva aromática", care: "Manjericão gosta de substrato levemente úmido e boa luminosidade.",
    note: "A faixa é uma referência visual, não uma recomendação agronômica.",
  },
  orquidea: {
    name: "Orquídea", icon: "🌸", initialMoisture: 48, threshold: 32, temperature: 23.8, soilTemperature: 21.5, airHumidity: 64,
    location: "VARANDA", light: "Luz indireta", water: 0.18, interval: 7, nextWaterDays: 4, harvest: "Floração varia por espécie",
    category: "Flor tropical", care: "Orquídeas variam bastante por espécie; evite água parada no vaso e observe raízes e substrato.",
    note: "A umidade ideal depende do tipo de orquídea, do vaso e da ventilação.",
  },
  jiboia: {
    name: "Jiboia", icon: "🍃", initialMoisture: 42, threshold: 30, temperature: 24.1, soilTemperature: 22.0, airHumidity: 60,
    location: "INTERIOR", light: "Luz indireta", water: 0.25, interval: 8, nextWaterDays: 5, harvest: "Não se aplica · folhagem",
    category: "Folhagem", care: "A jiboia prefere luz indireta; espere a superfície do substrato começar a secar.",
    note: "A leitura do solo deve ser combinada com a observação do substrato.",
  },
  suculenta: {
    name: "Suculenta", icon: "🪴", initialMoisture: 21, threshold: 18, temperature: 25.2, soilTemperature: 23.0, airHumidity: 45,
    location: "JANELA", light: "Luz forte", water: 0.12, interval: 14, nextWaterDays: 10, harvest: "Não se aplica · crescimento lento",
    category: "Suculenta", care: "Suculentas geralmente pedem substrato bem drenado e períodos mais secos entre regas.",
    note: "Automatizar suculentas exige cautela para evitar excesso de água.",
  },
  samambaia: {
    name: "Samambaia", icon: "🌱", initialMoisture: 39, threshold: 45, temperature: 23.4, soilTemperature: 21.7, airHumidity: 68,
    location: "VARANDA", light: "Meia-sombra", water: 0.4, interval: 3, nextWaterDays: 1, harvest: "Não se aplica · folhagem",
    category: "Folhagem", care: "Samambaias costumam preferir umidade constante e luz indireta.",
    note: "O substrato e a umidade do ar influenciam o cuidado da samambaia.",
  },
  lirio: {
    name: "Lírio-da-paz", icon: "🌼", initialMoisture: 36, threshold: 40, temperature: 24.0, soilTemperature: 21.9, airHumidity: 61,
    location: "INTERIOR", light: "Meia-sombra", water: 0.3, interval: 7, nextWaterDays: 2, harvest: "Floração varia conforme o cuidado",
    category: "Flor tropical", care: "Lírio-da-paz prefere luz indireta; observe a terra e a planta antes de regar.",
    note: "A leitura não substitui a observação das folhas e da terra.",
  },
  cacto: {
    name: "Cacto", icon: "🌵", initialMoisture: 16, threshold: 14, temperature: 26.1, soilTemperature: 24.4, airHumidity: 42,
    location: "JANELA", light: "Sol direto", water: 0.1, interval: 21, nextWaterDays: 15, harvest: "Não se aplica · crescimento lento",
    category: "Cacto", care: "Cactos precisam de substrato drenado e regas espaçadas, conforme a espécie e a estação.",
    note: "Uma leitura isolada pode induzir ao excesso; verifique o substrato e a espécie.",
  },
  espada: {
    name: "Espada-de-são-jorge", icon: "🪴", initialMoisture: 27, threshold: 20, temperature: 24.3, soilTemperature: 22.2, airHumidity: 52,
    location: "INTERIOR", light: "Luz indireta", water: 0.18, interval: 14, nextWaterDays: 9, harvest: "Não se aplica · folhagem",
    category: "Folhagem", care: "Espada-de-são-jorge tolera períodos secos; evite manter o substrato encharcado.",
    note: "A faixa ilustrativa é conservadora para demonstrar uma planta mais tolerante à seca.",
  },
  costela: {
    name: "Costela-de-adão", icon: "🌿", initialMoisture: 40, threshold: 34, temperature: 24.4, soilTemperature: 22.3, airHumidity: 62,
    location: "INTERIOR", light: "Luz indireta", water: 0.32, interval: 8, nextWaterDays: 4, harvest: "Não se aplica · folhagem",
    category: "Folhagem", care: "Costela-de-adão prefere luz indireta; confira alguns centímetros do substrato antes de regar.",
    note: "A observação do substrato e do ambiente continua necessária.",
  },
};

const components = {
  raspberry: {
    icon: "🟩", category: "CONTROLADORA", title: "Raspberry Pi Pico W",
    description: "É o pequeno computador do canteiro: lê os sensores, aplica a regra de cuidado escolhida e envia o comando para a irrigação. O Wi‑Fi pode futuramente levar as leituras a um painel.",
    why: "Centraliza a lógica em um lugar programável e de baixo consumo; assim, sensores e acionamentos trabalham seguindo a mesma regra.",
    connection: "Recebe o sensor de solo em ADC0/GP26 e o DHT22 em GP15; comanda a entrada IN do relé por GP16. Compartilha o GND do circuito de controle.",
  },
  solo: {
    icon: "🌱", category: "SENSOR DO SUBSTRATO", title: "Sensor capacitivo de umidade",
    description: "Uma sonda capacitiva estima a umidade do substrato pela variação elétrica ao redor de suas trilhas. A leitura aparece como uma faixa relativa no painel.",
    why: "A terra pode secar em ritmos diferentes por causa do vaso, do clima e da planta. Medir perto das raízes dá mais contexto do que usar apenas um calendário fixo.",
    connection: "VCC e GND conforme a tensão admitida pelo módulo; saída analógica AO para ADC0/GP26 do Pico W. Calibre leituras secas e úmidas no substrato usado.",
  },
  ambiente: {
    icon: "🌡️", category: "SENSOR AMBIENTE", title: "DHT22 · temperatura e umidade do ar",
    description: "Mede a temperatura e a umidade relativa do ar ao redor do canteiro. Não mede a umidade da terra — são grandezas diferentes.",
    why: "Calor e ar seco aumentam a perda de água; essas leituras ajudam a interpretar o contexto junto com a umidade do substrato.",
    connection: "DATA em um GPIO digital (exemplo: GP15), com alimentação compatível e resistor pull-up quando requerido pelo módulo. Posicione à sombra e com circulação de ar.",
  },
  rele: {
    icon: "🔌", category: "ACIONAMENTO", title: "Módulo relé",
    description: "Funciona como uma chave comandada eletricamente: separa o sinal lógico de baixa potência da placa do circuito que liga a bomba.",
    why: "Os pinos da controladora não fornecem corrente para motores. Um estágio de acionamento adequado evita tentar alimentar a bomba diretamente pelo microcontrolador.",
    connection: "Entrada IN ligada a um GPIO de controle (exemplo: GP16); contatos COM/NO no circuito da bomba e fonte apropriada. Verifique isolamento, polaridade e capacidade do módulo.",
  },
  bomba: {
    icon: "🚿", category: "IRRIGAÇÃO", title: "Bomba ou válvula + gotejador",
    description: "A bomba movimenta água de um reservatório; a mangueira e o gotejador distribuem a água no canteiro. Uma válvula pode ser usada em outra configuração hidráulica.",
    why: "Entrega água onde a planta precisa, em vez de depender de uma pessoa acionando um regador. O tempo de acionamento precisa ser ajustado e testado.",
    connection: "Reservatório → bomba → mangueira → gotejador. A alimentação da bomba passa pelo contato do relé; nunca conecte motor diretamente a um GPIO.",
  },
  fonte: {
    icon: "🔋", category: "ALIMENTAÇÃO", title: "Fonte externa da bomba",
    description: "Fornece a tensão e a corrente exigidas pela bomba sem sobrecarregar a placa controladora.",
    why: "Motores podem exigir mais corrente e gerar ruído elétrico. Separar e dimensionar a alimentação torna o acionamento mais seguro e confiável.",
    connection: "Dimensione a fonte pela tensão e corrente de partida da bomba; use proteção adequada e siga o isolamento indicado pelo módulo relé. O GND comum depende do circuito escolhido.",
  },
};

const moistureValue = document.querySelector("#soil-moisture-value");
const moistureBar = document.querySelector("#moisture-bar");
const moistureTrack = document.querySelector(".moisture-track");
const moistureStatus = document.querySelector("#soil-moisture-status");
const waterUsage = document.querySelector("#water-usage");
const wateringStatus = document.querySelector("#watering-status");
const irrigationStatus = document.querySelector("#irrigation-status");
const irrigationStatusTitle = document.querySelector("#irrigation-status-title");
const irrigationStatusCopy = document.querySelector("#irrigation-status-copy");
const waterButton = document.querySelector("#water-now-button");
const automationToggle = document.querySelector("#automation-toggle");
const automationDescription = document.querySelector("#automation-description");
const bedIllustration = document.querySelector(".bed-illustration");
const preview = document.querySelector("#demo-preview");
const plantSelect = document.querySelector("#demo-plant-select");
const plantDetailsDialog = document.querySelector("#plant-details-dialog");
const wateringCalendarDialog = document.querySelector("#watering-calendar-dialog");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let activePlant = plants[plantSelect.value];
let soilMoisture = activePlant.initialMoisture;
let airTemperature = activePlant.temperature;
let soilTemperature = activePlant.soilTemperature;
let nextWaterDays = activePlant.nextWaterDays;
let waterUsed = 0;
let wasWatered = false;
let isWatering = false;
let wateringTimer = 0;
let sensorTimer = 0;
let moistureTimer = 0;
let finishTimer = 0;
const plantIds = Object.keys(plants);

function formatTemperature(value) {
  return value.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

function formatDay(date) {
  return new Intl.DateTimeFormat("pt-BR", { weekday: "short", day: "2-digit", month: "short" })
    .format(date)
    .replace(".", "");
}

function nextWaterLabel() {
  if (nextWaterDays === 0) return "Hoje";
  if (nextWaterDays === 1) return "Amanhã";
  return `Em ${nextWaterDays} dias`;
}

function updateReadings() {
  const isDry = soilMoisture < activePlant.threshold;
  moistureValue.textContent = String(soilMoisture);
  moistureBar.style.width = `${soilMoisture}%`;
  moistureBar.style.background = isDry ? "var(--yellow)" : "var(--grass)";
  moistureTrack.setAttribute("aria-valuenow", String(soilMoisture));
  moistureTrack.setAttribute("aria-valuetext", `${soilMoisture}% · limite ilustrativo ${activePlant.threshold}%`);
  waterUsage.textContent = waterUsed.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  document.querySelector("#temperature-value").textContent = formatTemperature(airTemperature);
  document.querySelector("#air-temperature").textContent = formatTemperature(airTemperature);
  document.querySelector("#soil-temperature-value").textContent = formatTemperature(soilTemperature);
  moistureStatus.textContent = isDry
    ? `Abaixo da referência de ${activePlant.threshold}% · confira a terra`
    : "Acima da referência · continue acompanhando";
  moistureStatus.classList.toggle("is-dry", isDry);
  wateringStatus.textContent = isWatering
    ? "Irrigando…"
    : wasWatered ? "Regada nesta simulação" : "Ainda não regada";
  irrigationStatus.classList.toggle("is-dry", isDry && !isWatering);
  waterButton.disabled = isWatering;
}

function updatePlant() {
  if (isWatering) return;
  activePlant = plants[plantSelect.value];
  soilMoisture = activePlant.initialMoisture;
  airTemperature = activePlant.temperature;
  soilTemperature = activePlant.soilTemperature;
  nextWaterDays = activePlant.nextWaterDays;
  waterUsed = 0;
  wasWatered = false;
  document.querySelector("#bed-title").textContent = `${activePlant.name} · canteiro 01`;
  document.querySelector("#plant-diagram-name").textContent = activePlant.name;
  document.querySelector("#plant-emoji").textContent = activePlant.icon;
  document.querySelector("#bed-location").textContent = `01 · ${activePlant.location}`;
  document.querySelector("#air-humidity-value").textContent = String(activePlant.airHumidity);
  document.querySelector("#plant-care-copy").textContent = activePlant.care;
  automationDescription.textContent = automationToggle.getAttribute("aria-pressed") === "true"
    ? `Ativado · referência de ${activePlant.threshold}%`
    : "Desativado · controle manual";
  document.querySelector("#calendar-automation-toggle small").textContent =
    automationToggle.getAttribute("aria-pressed") === "true"
      ? `Ativado · limite de ${activePlant.threshold}%`
      : "Desativado · simulação";
  irrigationStatusTitle.textContent = "Irrigação em espera";
  irrigationStatusCopy.textContent = `Referência ilustrativa: ${activePlant.threshold}% para esta planta. Confira o substrato antes de regar.`;
  bedIllustration.classList.remove("is-watering");
  irrigationStatus.classList.remove("is-watering");
  updateReadings();
  updatePlantDetails();
  renderWateringCalendar();
  if (automationToggle.getAttribute("aria-pressed") === "true" && soilMoisture < activePlant.threshold) {
    startWatering(true);
  }
}

function updatePlantDetails() {
  document.querySelector("#details-plant-icon").textContent = activePlant.icon;
  document.querySelector("#details-plant-name").textContent = activePlant.name;
  document.querySelector("#details-plant-description").textContent = `${activePlant.category} · ${activePlant.location.toLowerCase()}`;
  document.querySelector("#details-next-watering").textContent = nextWaterLabel();
  document.querySelector("#details-watering-interval").textContent = `A cada ${activePlant.interval} dias`;
  document.querySelector("#details-light").textContent = activePlant.light;
  document.querySelector("#details-harvest").textContent = activePlant.harvest;
  document.querySelector("#details-moisture").textContent = `${activePlant.threshold}% no solo`;
  document.querySelector("#details-location").textContent = activePlant.location.charAt(0) + activePlant.location.slice(1).toLowerCase();
  document.querySelector("#details-care-copy").textContent = activePlant.care;
  document.querySelector("#details-care-note").textContent = activePlant.note;

  const miniGarden = document.querySelector("#mini-garden-plants");
  miniGarden.replaceChildren();
  plantIds.forEach((plantId) => {
    const plant = plants[plantId];
    const button = document.createElement("button");
    button.className = `mini-garden-plant${plantId === plantSelect.value ? " is-selected" : ""}`;
    button.type = "button";
    button.setAttribute("aria-pressed", String(plantId === plantSelect.value));
    button.setAttribute("aria-label", `Voltar ao painel com ${plant.name}`);
    button.innerHTML = `<span aria-hidden="true">${plant.icon}</span><span>${plant.name}</span>`;
    button.addEventListener("click", () => {
      plantSelect.value = plantId;
      updatePlant();
      plantDetailsDialog.close();
      wateringCalendarDialog.close();
      document.querySelector(".telemetry-card").scrollIntoView({ behavior: "smooth", block: "center" });
    });
    miniGarden.append(button);
  });
}

function renderWateringCalendar() {
  const calendar = document.querySelector("#watering-calendar-grid");
  calendar.replaceChildren();
  document.querySelector("#calendar-plant-name").textContent = `${activePlant.name} · canteiro 01`;

  for (let dayOffset = 0; dayOffset < 14; dayOffset += 1) {
    const date = new Date();
    date.setDate(date.getDate() + dayOffset);
    const isDue = dayOffset >= nextWaterDays
      && (dayOffset - nextWaterDays) % activePlant.interval === 0;
    const day = document.createElement("article");
    day.className = `watering-calendar-day${dayOffset === 0 ? " is-today" : ""}${isDue ? " is-due" : ""}`;
    const dateLabel = document.createElement("strong");
    dateLabel.textContent = dayOffset === 0 ? "Hoje" : formatDay(date);
    const careLabel = document.createElement("small");
    careLabel.textContent = isDue ? "Conferir a terra" : "Sem rega prevista";
    day.append(dateLabel, careLabel);
    calendar.append(day);
  }
}

function updateComponent(componentId) {
  const component = components[componentId];
  if (!component) return;

  document.querySelector("#component-detail-icon").textContent = component.icon;
  document.querySelector("#component-category").textContent = component.category;
  document.querySelector("#component-detail-title").textContent = component.title;
  document.querySelector("#component-detail-description").textContent = component.description;
  document.querySelector("#component-detail-why").textContent = component.why;
  document.querySelector("#component-detail-connection").textContent = component.connection;

  document.querySelectorAll(".component-chip").forEach((button) => {
    const selected = button.dataset.component === componentId;
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
}

function setPreview(view) {
  preview.dataset.preview = view;
  document.querySelectorAll(".view-option").forEach((button) => {
    const selected = button.dataset.preview === view;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
}

function startWatering(automatic = false) {
  if (isWatering) return;

  const startingMoisture = soilMoisture;
  const startingAirTemperature = airTemperature;
  const startingSoilTemperature = soilTemperature;
  isWatering = true;
  plantSelect.disabled = true;
  waterButton.disabled = true;
  bedIllustration.classList.add("is-watering");
  irrigationStatus.classList.add("is-watering");
  irrigationStatusTitle.textContent = "Lendo sensor e acionando a irrigação…";
  irrigationStatusCopy.textContent = automatic
    ? `Leitura abaixo de ${activePlant.threshold}% · simulação automática iniciada.`
    : "Fase 1/3 · a controladora lê a umidade antes de acionar o relé.";
  updateReadings();

  const wateringDuration = reducedMotion.matches ? 900 : 3200;
  if (!reducedMotion.matches) {
    sensorTimer = window.setTimeout(() => {
      irrigationStatusCopy.textContent = "Fase 2/3 · relé ativado, água percorrendo a mangueira.";
      bedIllustration.classList.add("is-water-flowing");
    }, 800);
    wateringTimer = window.setTimeout(() => {
      irrigationStatusCopy.textContent = "Fase 3/3 · a água chega ao solo e a leitura se atualiza.";
      bedIllustration.classList.add("is-soil-wetting");
      let step = 0;
      moistureTimer = window.setInterval(() => {
        step += 1;
        soilMoisture = Math.min(100, startingMoisture + Math.round((34 * step) / 8));
        airTemperature = Math.max(startingAirTemperature - 1.2, startingAirTemperature - (1.2 * step) / 8);
        soilTemperature = Math.max(startingSoilTemperature - 1.8, startingSoilTemperature - (1.8 * step) / 8);
        updateReadings();
        if (step === 8) window.clearInterval(moistureTimer);
      }, 140);
    }, 1750);
  }

  finishTimer = window.setTimeout(() => {
    window.clearTimeout(sensorTimer);
    window.clearTimeout(wateringTimer);
    window.clearInterval(moistureTimer);
    soilMoisture = Math.min(100, startingMoisture + 34);
    airTemperature = Math.max(12, startingAirTemperature - 1.2);
    soilTemperature = Math.max(8, startingSoilTemperature - 1.8);
    waterUsed += activePlant.water;
    wasWatered = true;
    nextWaterDays = activePlant.interval;
    isWatering = false;
    plantSelect.disabled = false;
    bedIllustration.classList.remove("is-watering", "is-water-flowing", "is-soil-wetting");
    irrigationStatus.classList.remove("is-watering");
    irrigationStatusTitle.textContent = "Rega simulada concluída";
    irrigationStatusCopy.textContent = `Umidade atualizada · consumo ilustrativo de ${activePlant.water.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} L.`;
    updateReadings();
    updatePlantDetails();
    renderWateringCalendar();
    if (automationToggle.getAttribute("aria-pressed") === "true") {
      irrigationStatusCopy.textContent = `Rega concluída · modo automático ativo para abaixo de ${activePlant.threshold}%.`;
    }
  }, wateringDuration);
}

plantSelect.addEventListener("change", updatePlant);
waterButton.addEventListener("click", () => startWatering());

function setAutomation(enabled) {
  automationToggle.setAttribute("aria-pressed", String(enabled));
  document.querySelector("#calendar-automation-toggle").setAttribute("aria-pressed", String(enabled));
  automationDescription.textContent = enabled
    ? `Ativado · referência de ${activePlant.threshold}%`
    : "Desativado · controle manual";
  document.querySelector("#calendar-automation-toggle small").textContent = enabled
    ? `Ativado · limite de ${activePlant.threshold}%`
    : "Desativado · simulação";

  if (enabled && soilMoisture < activePlant.threshold) {
    startWatering(true);
  } else if (enabled) {
    irrigationStatusTitle.textContent = "Modo automático ativo";
    irrigationStatusCopy.textContent = `A simulação aguarda a umidade ficar abaixo de ${activePlant.threshold}%.`;
  } else if (!isWatering) {
    irrigationStatusTitle.textContent = "Irrigação em espera";
    irrigationStatusCopy.textContent = `Referência ilustrativa: ${activePlant.threshold}% para esta planta. Confira o substrato antes de regar.`;
  }
}

automationToggle.addEventListener("click", () => {
  setAutomation(automationToggle.getAttribute("aria-pressed") !== "true");
});
document.querySelector("#calendar-automation-toggle").addEventListener("click", () => {
  setAutomation(document.querySelector("#calendar-automation-toggle").getAttribute("aria-pressed") !== "true");
});

document.querySelector("#open-plant-details").addEventListener("click", () => {
  updatePlantDetails();
  plantDetailsDialog.showModal();
});
document.querySelector("#back-to-dashboard").addEventListener("click", () => {
  plantDetailsDialog.close();
  document.querySelector(".telemetry-card").scrollIntoView({ behavior: "smooth", block: "center" });
});
document.querySelector("#open-watering-calendar").addEventListener("click", () => {
  renderWateringCalendar();
  wateringCalendarDialog.showModal();
});
document.querySelector("#details-calendar-button").addEventListener("click", () => {
  renderWateringCalendar();
  plantDetailsDialog.close();
  wateringCalendarDialog.showModal();
});
document.querySelector("#calendar-back-to-details").addEventListener("click", () => {
  wateringCalendarDialog.close();
  plantDetailsDialog.showModal();
});
document.querySelectorAll(".plant-info-dialog .dialog-close").forEach((button) => {
  button.addEventListener("click", () => button.closest("dialog").close());
});

document.querySelectorAll(".view-option").forEach((button) => {
  button.addEventListener("click", () => setPreview(button.dataset.preview));
});

document.querySelectorAll(".component-chip, .component-hotspot").forEach((button) => {
  button.addEventListener("click", () => {
    updateComponent(button.dataset.component);
    if (button.classList.contains("component-hotspot")) {
      document.querySelector("#components-title").scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

window.addEventListener("pagehide", () => {
  window.clearTimeout(sensorTimer);
  window.clearTimeout(wateringTimer);
  window.clearTimeout(finishTimer);
  window.clearInterval(moistureTimer);
});

updatePlant();
