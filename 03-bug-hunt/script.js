// =============================================
// 03 · Bug Hunt 🐞
// This code has 4 bugs. Don't read ahead hunting for them!
// Let the console lead you, one error at a time:
//   1. Refresh the page and read the red error.
//   2. Click the file:line link to jump to it.
//   3. Fix it, save, refresh. Repeat.
// =============================================

const student = {
  name: "Ada",
  scores: [80, 95, 72],
};

// Adds up the scores and divides by how many there are
function getAverage(scores) {
  let total = 0;
  for (let i = 0; i < scores.length; i++) {
    total = totl + scores[i];
  }
  return total / scores.length;
}

// Turns a number into a letter grade
function getLetterGrade(average) {
  if (average >= 70) {
    return "C";
  } else if (average >= 80) {
    return "B";
  } else if (average >= 90) {
    return "A";
  } else {
    return "F";
  }
}

// Builds the sentence we show on the page
function buildReport(person) {
  const average = getAverage(person.score);
  const grade = getLetterGrade(average);
  return `${person.name}: ${average.toFixed(1)} (${grade})`;
}

// Hook it up to the page
const button = document.querySelector("#calc-btn");
const reportEl = document.querySelector("#report");

button.addEventListener("click", function () {
  reportEl.textContent = buildReport(student);
});


// ---------------------------------------------
// 🗺️ TRACING BONUS
// When an error happens inside nested calls, the console shows the
// CALL STACK: the chain of functions that were running, newest on top.
// Read it bottom → top to see the path the code took:
//
//   getAverage      ← where it actually broke
//   buildReport     ← who called getAverage
//   (anonymous)     ← the click handler, who called buildReport
//
// Try it: add the word   debugger;   as the first line inside
// buildReport, keep DevTools open, and click the button.
// The code freezes there. Use "Step into" (↓) to walk line by line
// and hover any variable to see its value.
// ---------------------------------------------
