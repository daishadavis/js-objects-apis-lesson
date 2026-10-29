// =============================================
// 04 · Talking to APIs — SOLUTION
// =============================================

console.log("04 loaded ✅");

// =============================================
// PART A · WEATHER: QUERY PARAMETERS
// =============================================

const latInput = document.querySelector("#lat");
const lonInput = document.querySelector("#lon");
const unitSelect = document.querySelector("#unit");
const weatherBtn = document.querySelector("#weather-btn");
const weatherOutput = document.querySelector("#weather-output");

async function getWeather(latitude, longitude, unit) {
  // STEP 1: Build the URL from the parameters
  const url =
    "https://api.open-meteo.com/v1/forecast" +
    `?latitude=${latitude}` +
    `&longitude=${longitude}` +
    "&current=temperature_2m,wind_speed_10m" +
    `&temperature_unit=${unit}`;

  console.log("Requesting:", url);

  // STEP 2: send the request and wait for the response
  const response = await fetch(url);

  // STEP 3: check the status code
  if (!response.ok) {
    throw new Error(`Weather request failed (${response.status})`);
  }

  // STEP 4: read the body as JSON and wait for it
  const data = await response.json();
  console.log(data);

  // STEP 5: return just what we need
  return data.current;
}

weatherBtn.addEventListener("click", async function () {
  weatherOutput.classList.remove("error");
  weatherOutput.textContent = "Loading…";

  try {
    const current = await getWeather(latInput.value, lonInput.value, unitSelect.value);
    const symbol = unitSelect.value === "fahrenheit" ? "°F" : "°C";

    // TODO 6
    weatherOutput.textContent =
      `🌡️ ${current.temperature_2m}${symbol}\n` +
      `💨 Wind: ${current.wind_speed_10m} km/h`;
  } catch (error) {
    console.error(error);
    weatherOutput.classList.add("error");
    weatherOutput.textContent = error.message;
  }
});

// UPGRADE (show after the basic version works):
// URLSearchParams builds the "?a=1&b=2" part for you and handles special characters.
//
//   const params = new URLSearchParams({
//     latitude: latitude,
//     longitude: longitude,
//     current: "temperature_2m,wind_speed_10m",
//     temperature_unit: unit,
//   });
//   const url = `https://api.open-meteo.com/v1/forecast?${params}`;


// =============================================
// PART B · DICTIONARY: PATH PARAMETERS
// =============================================

const wordInput = document.querySelector("#word");
const defineBtn = document.querySelector("#define-btn");
const defineOutput = document.querySelector("#define-output");

async function getDefinition(word) {
  // TODO 7
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  // TODO 8
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`No definition found for "${word}" (${response.status})`);
  }
  const data = await response.json();
  console.log(data);

  // TODO 9
  const firstMeaning = data[0].meanings[0];
  return {
    partOfSpeech: firstMeaning.partOfSpeech,
    definition: firstMeaning.definitions[0].definition,
  };
}

defineBtn.addEventListener("click", async function () {
  defineOutput.classList.remove("error");
  defineOutput.textContent = "Loading…";

  try {
    const result = await getDefinition(wordInput.value.trim());
    defineOutput.textContent = `${wordInput.value.trim()} (${result.partOfSpeech}): ${result.definition}`;
  } catch (error) {
    console.error(error);
    defineOutput.classList.add("error");
    defineOutput.textContent = error.message;
  }
});

// EXPERIMENT ANSWERS
//   Made-up word ("flurbo") → 404 Not Found, so response.ok is false and we throw.
//   Latitude 999            → 400 Bad Request; the Response tab explains why.
//   Removing `await`        → response is a Promise, not a Response, so
//                             response.ok is undefined and the check throws.
