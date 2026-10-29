# Objects, Methods, APIs & Guess the Word

A 2-hour, hands-on JavaScript lesson. You'll trace how data moves between functions, use objects and `this` with confidence, learn to read error messages, call real APIs with `fetch`, `async` and `await`, and then build **Guess the Word** together.

## What you need

- A web browser (Chrome recommended, because the steps below use Chrome DevTools)
- A code editor (VS Code recommended)
- An internet connection (exercise 04 and the game call real APIs)
- Optional: the **Live Server** extension for VS Code

No installs, frameworks or build tools. Just HTML, CSS and JavaScript.

## Getting started

```bash
git clone <this-repo-url>
cd js-objects-apis-lesson
```

Open any folder's `index.html` in your browser. Keep DevTools open the whole time:

- **Mac:** `Cmd + Option + J`
- **Windows:** `Ctrl + Shift + J`

## Branches

| Branch     | What's in it |
|------------|--------------|
| `main`     | The **starter** code. Follow the `TODO` comments. |
| `solution` | The **finished** code. Peek if you're stuck, but try first! |

```bash
git switch solution   # see the finished version
git switch main       # back to the starter
```

> If you've changed files on `main`, run `git stash` before switching.

## The lesson

| Folder | Topic | Time |
|--------|-------|------|
| `01-data-flow/` | Parameters, arguments, return values, scope, ReferenceError | ~15 min |
| `02-objects-and-this/` | An object with several methods, nested if/else, when to use `this` | ~15 min |
| `03-bug-hunt/` | Reading error messages and tracing the call stack | ~10 min |
| `04-fetch-apis/` | `fetch`, `async`/`await`, query and path parameters, the Network tab | ~25 min |
| `05-guess-the-word/` | Build the game together: plan it, then stitch it together | ~40 min |

## Cheat sheet

### Data flow

```js
function add(a, b) {   // a, b = PARAMETERS (placeholders)
  return a + b;        // return = hand a value back
}
const sum = add(2, 3); // 2, 3 = ARGUMENTS (real values); sum = 5
```

### `this`

```js
const game = {
  guesses: 5,
  useGuess() {
    this.guesses -= 1;  // inside the object → this
  },
};
game.useGuess();        // outside the object → its name

// Passing a method to an event listener? Wrap it:
button.addEventListener("click", () => game.useGuess());
```

### Calling an API

```js
async function getData(word) {
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  const response = await fetch(url);          // 1. send the request, wait
  if (!response.ok) {                         // 2. check the status
    throw new Error(`Request failed (${response.status})`);
  }
  const data = await response.json();         // 3. read the JSON, wait
  return data;                                // 4. hand it back
}
```

### Reading an error

```
Uncaught TypeError: Cannot read properties of undefined (reading 'length')   ← what went wrong
    at getAverage (script.js:18)    ← where it broke (click this!)
    at buildReport (script.js:39)   ← who called it
    at HTMLButtonElement.<anonymous> (script.js:49)   ← who started it
```

| Error | Usually means |
|-------|---------------|
| `ReferenceError: x is not defined` | Typo, or `x` lives in a different scope |
| `TypeError: Cannot read properties of null` | `querySelector` found nothing |
| `TypeError: Cannot read properties of undefined` | A property or variable you expected doesn't exist |
| `TypeError: x is not a function` | Typo in a method name, or calling something that isn't a function |
| `SyntaxError: Unexpected token` | A missing `)`, `}` or `,` near that line |

## Guess the Word

`05-guess-the-word/` uses the course's HTML, CSS and images unchanged. You only write `js/script.js`; the starter has the plan as numbered steps.

The word list is a plain text file (one word per line), so the game uses `response.text()` instead of `response.json()`. If the request fails, the solution keeps a starter word so the game still runs.

### Stretch goals

1. **Hint button:** fetch the secret word's definition from the Dictionary API and show it. Bonus: a hint costs one guess.
2. Let the player press Enter as well as clicking Guess (it's a form, so this almost works already).
3. Show how many games you've won this session.
4. Store the game's data in one `game` object, like in exercise 02, and use `this` in its methods.

## APIs used

- [Open-Meteo](https://open-meteo.com/): free weather API, no key needed. Weather data by Open-Meteo.com, licensed CC BY 4.0.
- [Free Dictionary API](https://dictionaryapi.dev/): free definitions, no key needed.
