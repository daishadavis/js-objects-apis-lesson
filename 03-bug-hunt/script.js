// =============================================
// 03 · Bug Hunt 🐞 — SOLUTION
// The 4 bugs, in the order the console reveals them:
//
//   1. TypeError: Cannot read properties of null (reading 'addEventListener')
//      → querySelector("#calc-btn") found nothing. The HTML id is "calculate-btn".
//
//   2. TypeError: Cannot read properties of undefined (reading 'length')
//      → Call stack: getAverage ← buildReport ← (click handler).
//        buildReport passed person.score, but the property is person.scores.
//
//   3. ReferenceError: totl is not defined
//      → Typo inside getAverage. Should be total.
//
//   4. No error, wrong answer: shows "C" instead of "B".
//      → if/else checks run top to bottom and stop at the first true one.
//        82.3 >= 70 is true, so it never reached the B check.
//        Fix: check the highest grade first.
// =============================================

const student = {
  name: "Ada",
  scores: [80, 95, 72],
};

function getAverage(scores) {
  let total = 0;
  for (let i = 0; i < scores.length; i++) {
    total = total + scores[i]; // Bug 3 fixed
  }
  return total / scores.length;
}

function getLetterGrade(average) {
  // Bug 4 fixed: highest first
  if (average >= 90) {
    return "A";
  } else if (average >= 80) {
    return "B";
  } else if (average >= 70) {
    return "C";
  } else {
    return "F";
  }
}

function buildReport(person) {
  const average = getAverage(person.scores); // Bug 2 fixed
  const grade = getLetterGrade(average);
  return `${person.name}: ${average.toFixed(1)} (${grade})`;
}

const button = document.querySelector("#calculate-btn"); // Bug 1 fixed
const reportEl = document.querySelector("#report");

button.addEventListener("click", function () {
  reportEl.textContent = buildReport(student); // "Ada: 82.3 (B)"
});
