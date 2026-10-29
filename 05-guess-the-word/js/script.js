// =============================================
// 05 · Guess the Word
// We build this one TOGETHER. Plan first, then code one step at a time.
// After every step: save, refresh, and check the console.
// =============================================

// ---------------------------------------------
// THE PLAN (in plain English)
//   1. Grab the elements we need from index.html
//   2. Store the game's data: the word, the letters guessed, the guesses left
//   3. getWord: fetch the word list (an API!) and pick a random word
//   4. placeholder: show the word as ● dots
//   5. Guess button click → read the letter → validateInput → makeGuess
//   6. makeGuess: skip repeats, remember new letters
//   7. showGuessedLetters: list them on the page
//   8. updateWordInProgress: swap ● for correct letters
//   9. updateGuessesRemaining: lose a guess on a miss; 0 = game over
//  10. checkIfWin: does the word in progress match the word?
//  11. startOver + Play Again: reset the data and the page
// ---------------------------------------------


// ---------------------------------------------
// STEP 1 · Select the elements (DOM review!)
// Look at index.html and find each class or id:
//   .guessed-letters   .guess   #letter   .word-in-progress
//   .remaining   .remaining span   .message   .play-again
// ---------------------------------------------



// ---------------------------------------------
// STEP 2 · Game data
// let word = "magnolia";          (a starter word until the API works)
// let guessedLetters = [];
// let remainingGuesses = 8;
// ---------------------------------------------



// ---------------------------------------------
// STEP 3 · getWord (async + fetch + await)
// The word list is a plain text file with one word per line:
// https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt
//   - fetch it and check response.ok
//   - it's TEXT, not JSON: use await response.text()
//   - split it into an array by line: .split("\n")
//   - pick a random one and .trim() it
//   - then call placeholder(word)
// ---------------------------------------------



// ---------------------------------------------
// STEP 4 · placeholder(word)
// One ● for each letter, shown in .word-in-progress
// ---------------------------------------------



// ---------------------------------------------
// STEP 5 · The Guess button
// The button is inside a <form>, so clicking it reloads the page.
// Remember event.preventDefault()!
//   - clear the message
//   - read the input's value
//   - validateInput(guess); if it's good, makeGuess(guess)
//   - empty the input
// ---------------------------------------------



// ---------------------------------------------
// STEP 6 · validateInput(input)  ← nested if/else
//   empty?            → message: "Please enter a letter."
//   more than one?    → message: "Please enter a single letter."
//   not A–Z?          → message: "Please enter a letter from A to Z."
//   otherwise         → return input
// Hint: const acceptedLetter = /[a-zA-Z]/;  and  input.match(acceptedLetter)
// ---------------------------------------------



// ---------------------------------------------
// STEP 7 · makeGuess(guess)
//   - uppercase it
//   - already in guessedLetters? → message, and stop
//   - otherwise push it, then call:
//       showGuessedLetters()
//       updateGuessesRemaining(guess)
//       updateWordInProgress(guessedLetters)
// ---------------------------------------------



// ---------------------------------------------
// STEP 8 · showGuessedLetters()
// Empty the <ul>, then add one <li> per guessed letter.
// (Same createElement + appendChild moves as the to-do app!)
// ---------------------------------------------



// ---------------------------------------------
// STEP 9 · updateWordInProgress(guessedLetters)
// For each letter in the word: guessed? show it : show ●
// Then call checkIfWin()
// ---------------------------------------------



// ---------------------------------------------
// STEP 10 · updateGuessesRemaining(guess)  ← nested if/else again
//   not in the word → "Sorry, the word has no X." and subtract 1
//   in the word     → "Good guess! The word has the letter X."
//   then: 0 left → "Game over!" + reveal the word + startOver()
//         1 left → span says "one guess"
//         else   → span says "N guesses"
// ---------------------------------------------



// ---------------------------------------------
// STEP 11 · checkIfWin()
// If the word in progress === the word (uppercase):
//   - add the class "win" to the message
//   - message: <p class="highlight">You guessed the correct word! Congrats!</p>
//   - startOver()
// ---------------------------------------------



// ---------------------------------------------
// STEP 12 · startOver() and the Play Again button
// startOver: hide the Guess button, remaining text and guessed letters;
//            show the Play Again button. (classList "hide")
// Play Again click: reset the data, clear the page, getWord(),
//                   and flip the hide classes back.
// ---------------------------------------------
