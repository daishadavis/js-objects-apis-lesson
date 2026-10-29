// =============================================
// 04 · Talking to APIs
// An API is a restaurant waiter:
//   you (the browser) → place an order (a REQUEST, to a URL)
//   the kitchen (a server) → cooks it
//   the waiter → brings back your food (a RESPONSE, usually JSON)
// You never go into the kitchen. You just need to know the menu
// (the API's docs) and how to order (the URL + its parameters).
//
// 🛠️ Keep DevTools open on the NETWORK tab (filter: Fetch/XHR)
// so you can watch every order go out and come back.
// =============================================

console.log("04 loaded ✅");

// ---------------------------------------------
// WARM-UP: what does fetch() give you right away?
// Paste this into the console and press Enter:
//
//   fetch("https://api.dictionaryapi.dev/api/v2/entries/en/hello")
//
// You get a Promise { <pending> }: an order ticket, not the food.
// `await` means "wait at the counter until the order is ready".
// `await` only works inside a function marked `async`.
// ---------------------------------------------


// =============================================
// PART A · WEATHER: QUERY PARAMETERS
// Query parameters are the options on your order, after the "?":
//
//   https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01
//   └────────── base URL (endpoint) ─────┘ └──────── parameters ─────────┘
//
//   ?  starts the parameters     &  separates them     key=value  is one option
// Docs (the menu): https://open-meteo.com/en/docs
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

  // STEP 2: TODO: Send the request and WAIT for the response.
  // Hint: const response = await fetch(url);


  // STEP 3: TODO: Check the response status. 200–299 means OK.
  // If it's NOT ok, throw an error with the status code.
  // Hint: if (!response.ok) { throw new Error(`Weather request failed (${response.status})`); }


  // STEP 4: TODO: Turn the response body into a JS object and WAIT for it.
  // Hint: const data = await response.json();
  // Then console.log(data) and explore it in the console!


  // STEP 5: TODO: RETURN just the part we need: data.current

}

weatherBtn.addEventListener("click", async function () {
  weatherOutput.classList.remove("error");
  weatherOutput.textContent = "Loading…";

  // try = "attempt this"   catch = "if anything throws, land here instead of crashing"
  try {
    const current = await getWeather(latInput.value, lonInput.value, unitSelect.value);
    const symbol = unitSelect.value === "fahrenheit" ? "°F" : "°C";

    // TODO 6: Show the temperature and wind speed on the page.
    // Hint: current.temperature_2m and current.wind_speed_10m
    weatherOutput.textContent = "TODO: show the weather here";
  } catch (error) {
    console.error(error);
    weatherOutput.classList.add("error");
    weatherOutput.textContent = error.message;
  }
});

// 🧪 EXPERIMENTS (watch the Network tab each time):
//   1. Change latitude/longitude to your hometown (search "latlong" for yours).
//   2. Switch to °C. Which parameter changed in the URL?
//   3. Type 999 as the latitude. What status code comes back? What does the response say?


// =============================================
// PART B · DICTIONARY: PATH PARAMETERS
// Sometimes the "option" is part of the path itself, not after a ?:
//
//   https://api.dictionaryapi.dev/api/v2/entries/en/magnolia
//                                                   └ word ┘
// =============================================

const wordInput = document.querySelector("#word");
const defineBtn = document.querySelector("#define-btn");
const defineOutput = document.querySelector("#define-output");

async function getDefinition(word) {
  // TODO 7: Build the URL with the word at the end.
  const url = "";

  // TODO 8: fetch it, check response.ok (throw `No definition found for "${word}"` if not),
  // then parse the JSON. Same 3 steps as getWeather!


  // The API returns an ARRAY of entries. Dig into the first one:
  //   data[0].meanings[0].partOfSpeech              → "noun"
  //   data[0].meanings[0].definitions[0].definition → "A tree..."
  // TODO 9: return an object with both: { partOfSpeech: ..., definition: ... }

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

// 🧪 EXPERIMENTS:
//   1. Try "javascript", "pizza", then a made-up word like "flurbo". What status code?
//   2. In the Network tab, click a request → "Response" or "Preview" to see the raw JSON.
//   3. Remove the `await` before fetch. What error do you get now, and why?
