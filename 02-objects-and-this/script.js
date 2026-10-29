// =============================================
// 02 · Objects, Methods & `this` — SOLUTION
// =============================================

console.log("02 loaded ✅");

const game = {
  // ---- DATA (properties) ----
  word: "magnolia",
  guessedLetters: [],
  remainingGuesses: 5,

  // ---- TOOLS (methods) ----

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

  // TODO 1
  isWon: function () {
    return !this.showProgress().includes("●");
  },

  validate: function (input) {
    if (input === "") {
      return "Please enter a letter.";
    } else {
      if (input.length > 1) {
        return "Only one letter at a time.";
      } else {
        // TODO 2
        if (!/[a-zA-Z]/.test(input)) {
          return "Letters only, please.";
        } else {
          return "";
        }
      }
    }
  },

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
        // TODO 3
        if (this.isWon()) {
          return `🎉 You got it! The word was ${this.word.toUpperCase()}.`;
        } else {
          return `Good guess! ${letter} is in the word.`;
        }
      } else {
        this.remainingGuesses = this.remainingGuesses - 1;
        // TODO 4
        if (this.remainingGuesses === 0) {
          return `Game over. The word was ${this.word.toUpperCase()}.`;
        } else {
          return `Sorry, no ${letter}. ${this.remainingGuesses} guesses left.`;
        }
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

console.log(game.showProgress());   // "●●●●●●●●"
console.log(game.makeGuess("a"));   // "Good guess! A is in the word."

// ---------------------------------------------
// Hook the object up to the page
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

// TODO 5: wrap the call so `game` is the thing before the dot → `this` is the game
resetBtn.addEventListener("click", function () {
  render(game.reset());
});

render("Guess a letter to start.");


// ---------------------------------------------
// `this` TRAPS — fixed
// ---------------------------------------------

// TRAP A fixed: inside a method, reach the object's own data with `this.`
const counter = {
  count: 0,
  add: function () {
    this.count = this.count + 1;
    return this.count;
  },
};
console.log("counter.add():", counter.add()); // 1

// TRAP B fixed: use a regular function (or method shorthand), not an arrow
const pet = {
  nickname: "Biscuit",
  speak() {
    return `${this.nickname} says woof`;
  },
};
console.log(pet.speak()); // "Biscuit says woof"
