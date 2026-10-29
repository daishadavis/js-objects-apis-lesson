// =============================================
// 05 · Guess the Word — SOLUTION
// =============================================

// ---------------------------------------------
// STEP 1 · Select the elements
// ---------------------------------------------
const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector("#letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingElement = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

// ---------------------------------------------
// STEP 2 · Game data
// ---------------------------------------------
let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

// ---------------------------------------------
// STEP 3 · getWord
// ---------------------------------------------
const WORDS_URL =
  "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt";

const getWord = async function () {
  try {
    const response = await fetch(WORDS_URL);
    if (!response.ok) {
      throw new Error(`Word list request failed (${response.status})`);
    }
    const words = await response.text();
    // one word per line; skip any blank lines
    const wordArray = words.split("\n").filter((line) => line.trim() !== "");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
  } catch (error) {
    // If the API is down, keep the starter word so the game still works.
    console.error(error);
  }
  placeholder(word);
};

// ---------------------------------------------
// STEP 4 · placeholder
// ---------------------------------------------
const placeholder = function (word) {
  const dots = [];
  for (const letter of word) {
    dots.push("●");
  }
  wordInProgress.textContent = dots.join("");
};

// Start the game
getWord();

// ---------------------------------------------
// STEP 5 · The Guess button
// ---------------------------------------------
guessButton.addEventListener("click", function (event) {
  event.preventDefault();
  message.textContent = "";

  const guess = letterInput.value;
  const goodGuess = validateInput(guess);

  if (goodGuess) {
    makeGuess(guess);
  }
  letterInput.value = "";
});

// ---------------------------------------------
// STEP 6 · validateInput
// ---------------------------------------------
const validateInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input.length === 0) {
    message.textContent = "Please enter a letter.";
  } else if (input.length > 1) {
    message.textContent = "Please enter a single letter.";
  } else if (!input.match(acceptedLetter)) {
    message.textContent = "Please enter a letter from A to Z.";
  } else {
    return input;
  }
};

// ---------------------------------------------
// STEP 7 · makeGuess
// ---------------------------------------------
const makeGuess = function (guess) {
  guess = guess.toUpperCase();
  if (guessedLetters.includes(guess)) {
    message.textContent = "You already guessed that letter. Try again.";
  } else {
    guessedLetters.push(guess);
    showGuessedLetters();
    updateGuessesRemaining(guess);
    updateWordInProgress(guessedLetters);
  }
};

// ---------------------------------------------
// STEP 8 · showGuessedLetters
// ---------------------------------------------
const showGuessedLetters = function () {
  guessedLettersElement.innerHTML = "";
  for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.textContent = letter;
    guessedLettersElement.appendChild(li);
  }
};

// ---------------------------------------------
// STEP 9 · updateWordInProgress
// ---------------------------------------------
const updateWordInProgress = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const revealWord = [];
  for (const letter of wordUpper) {
    if (guessedLetters.includes(letter)) {
      revealWord.push(letter);
    } else {
      revealWord.push("●");
    }
  }
  wordInProgress.textContent = revealWord.join("");
  checkIfWin();
};

// ---------------------------------------------
// STEP 10 · updateGuessesRemaining
// ---------------------------------------------
const updateGuessesRemaining = function (guess) {
  const upperWord = word.toUpperCase();
  if (!upperWord.includes(guess)) {
    message.textContent = `Sorry, the word has no ${guess}.`;
    remainingGuesses -= 1;
  } else {
    message.textContent = `Good guess! The word has the letter ${guess}.`;
  }

  if (remainingGuesses === 0) {
    message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
    startOver();
  } else if (remainingGuesses === 1) {
    remainingSpan.textContent = "one guess";
  } else {
    remainingSpan.textContent = `${remainingGuesses} guesses`;
  }
};

// ---------------------------------------------
// STEP 11 · checkIfWin
// ---------------------------------------------
const checkIfWin = function () {
  if (word.toUpperCase() === wordInProgress.textContent) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    startOver();
  }
};

// ---------------------------------------------
// STEP 12 · startOver and Play Again
// ---------------------------------------------
const startOver = function () {
  guessButton.classList.add("hide");
  remainingElement.classList.add("hide");
  guessedLettersElement.classList.add("hide");
  playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function () {
  // reset the data
  guessedLetters = [];
  remainingGuesses = 8;

  // reset the page
  message.classList.remove("win");
  message.textContent = "";
  guessedLettersElement.innerHTML = "";
  remainingSpan.textContent = `${remainingGuesses} guesses`;

  getWord();

  guessButton.classList.remove("hide");
  remainingElement.classList.remove("hide");
  guessedLettersElement.classList.remove("hide");
  playAgainButton.classList.add("hide");
});


// ---------------------------------------------
// STRETCH GOAL · Hint button (homework)
// Add <button class="hint">Hint</button> to index.html, then:
//   - fetch https://api.dictionaryapi.dev/api/v2/entries/en/${word}
//   - show data[0].meanings[0].definitions[0].definition in the message
//   - handle a 404 (some words have no definition)
//   - optional: a hint costs one guess!
// ---------------------------------------------
