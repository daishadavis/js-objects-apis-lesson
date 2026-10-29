// =============================================
// 02 · Objects, Methods & `this`
// An object is a backpack: it carries DATA (properties)
// and TOOLS (methods) together, under one name.
// =============================================

console.log("02 loaded ✅");

const game = {
  // ---- DATA (properties) ----
  word: "magnolia",
  guessedLetters: [],
  remainingGuesses: 5,

  // ---- TOOLS (methods) ----

  // Shows the word with ● for letters not guessed yet, e.g. "M●GN●●●A"
  showProgress: function () {
    const letters = this.word.toUpperCase().split("");
    const shown = [];
    for (const letter of letters) {
      if (this.guessedLetters.includes(letter)) {
        shown.push(letter);
      } else {
        shown.push("●");
      }
    }
    return shown.join("");
  },

  // Returns true when every letter in the word has been guessed
  isWon: function () {
    // TODO 1: return true if showProgress() has NO "●" left in it.
    // Hint: this.showProgress().includes("●") tells you if any are left.
    // Remember: inside the object, call other methods with `this.`

  },

  // Checks the input. Returns an error message, or "" if it's fine.
  // 👀 Nested if/else: read it like a flowchart, top to bottom.
  validate: function (input) {
    if (input === "") {
      return "Please enter a letter.";
    } else {
      if (input.length > 1) {
        return "Only one letter at a time.";
      } else {
        // TODO 2: if input is NOT a letter A–Z, return "Letters only, please."
        // Hint: /[a-zA-Z]/.test(input) is true for a letter.
        // Otherwise, return "" (empty string = no problem).

      }
    }
  },

  // The main move: try a letter and get back a message.
  makeGuess: function (input) {
    const problem = this.validate(input);
    if (problem !== "") {
      return problem;
    }

    const letter = input.toUpperCase();

    if (this.guessedLetters.includes(letter)) {
      return `You already guessed ${letter}. Try another.`;
    } else {
      this.guessedLetters.push(letter);

      if (this.word.toUpperCase().includes(letter)) {
        // TODO 3: nested if/else
        //   if the game is won → return "🎉 You got it! The word was ..." (use this.word)
        //   else               → return `Good guess! ${letter} is in the word.`

      } else {
        this.remainingGuesses = this.remainingGuesses - 1;
        // TODO 4: nested if/else
        //   if remainingGuesses is 0 → return "Game over. The word was ..."
        //   else                     → return `Sorry, no ${letter}. ${this.remainingGuesses} guesses left.`

      }
    }
  },

  reset: function () {
    this.guessedLetters = [];
    this.remainingGuesses = 5;
    console.log("Reset! The word is still", this.word.toUpperCase());
    return "New game! Guess a letter.";
  },
};

// ---------------------------------------------
// INSIDE vs OUTSIDE the object
// Rule of thumb:
//   Inside the object's own methods → say `this` ("me, the object")
//   Outside the object             → use its name: game.word, game.makeGuess("a")
// ---------------------------------------------

console.log(game.showProgress());   // outside → use the name
console.log(game.makeGuess("a"));

// ---------------------------------------------
// Hook the object up to the page (DOM review!)
// ---------------------------------------------

const letterInput = document.querySelector("#letter");
const guessBtn = document.querySelector("#guess-btn");
const resetBtn = document.querySelector("#reset-btn");
const progressEl = document.querySelector("#progress");
const statusEl = document.querySelector("#status");

function render(message) {
  progressEl.textContent = game.showProgress();
  statusEl.textContent = message;
}

guessBtn.addEventListener("click", function () {
  const message = game.makeGuess(letterInput.value.trim());
  render(message);
  letterInput.value = "";
  letterInput.focus();
});

// 🪤 TRAP: passing the method itself. Click Reset and read the console error.
// Inside reset(), `this` is now the BUTTON, not the game!
// TODO 5: fix it by wrapping the call in a function:
//   resetBtn.addEventListener("click", function () { render(game.reset()); });
resetBtn.addEventListener("click", game.reset);

render("Guess a letter to start.");


// ---------------------------------------------
// 🪤 MORE `this` TRAPS: uncomment one at a time, read the error, fix it.
// ---------------------------------------------

// TRAP A: forgetting `this.` inside a method → ReferenceError
// const counter = {
//   count: 0,
//   add: function () {
//     count = count + 1;   // 🐞 which `count`?
//     return count;
//   },
// };
// console.log(counter.add());

// TRAP B: arrow functions don't get their own `this`
// const pet = {
//   nickname: "Biscuit",
//   speak: () => {
//     return `${this.nickname} says woof`;   // 🐞 logs "undefined says woof"
//   },
// };
// console.log(pet.speak());
