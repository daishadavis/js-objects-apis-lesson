// =============================================
// 01 · How Data Travels Between Functions
// Open the console to see the output.
// =============================================

console.log("01 loaded ✅");

// ---------------------------------------------
// 1. PARAMETERS vs ARGUMENTS
// A PARAMETER is the empty labeled slot in the recipe.
// An ARGUMENT is the actual ingredient you hand over when you call it.
// ---------------------------------------------

//                    👇 parameters (placeholders)
function calculateTip(bill, percent) {
  return bill * (percent / 100);
}

//                      👇 arguments (real values)
console.log("Tip:", calculateTip(50, 20)); // 10

// TODO 1: Call calculateTip with an $80 bill and a 25% tip. Log the result.



// ---------------------------------------------
// 2. RETURN VALUES
// `return` hands a value BACK to whoever called the function.
// No return? The function hands back `undefined`.
// ---------------------------------------------

function formatMoney(amount) {
  // TODO 2: RETURN the amount as a string like "$12.50"
  // Hint: "$" + amount.toFixed(2)
}

// 🤔 PREDICT: what will this log before you finish TODO 2? Then run it.
console.log("Formatted:", formatMoney(12.5));



// ---------------------------------------------
// 3. A PIPELINE: one function's return becomes the next one's argument
// Like a relay race: each runner hands the baton to the next.
// ---------------------------------------------

function calculateTotal(bill, tip) {
  return bill + tip;
}

function printReceipt(bill, percent) {
  const tip = calculateTip(bill, percent);   // baton 1
  const total = calculateTotal(bill, tip);   // baton 2
  const pretty = formatMoney(total);         // baton 3
  return `Bill: ${formatMoney(bill)} | Tip: ${formatMoney(tip)} | Total: ${pretty}`;
}

console.log(printReceipt(40, 15));

// TODO 3: TRACE IT on paper first, then check in the console.
// For printReceipt(40, 15), write down the value of:
//   tip   = ?
//   total = ?
//   pretty = ?



// ---------------------------------------------
// 4. SCOPE: where can a variable be seen?
// Think of scope like rooms in a house:
//   - Global = the living room. Everyone can see it.
//   - Function = a bedroom. Only code inside that function can see it.
//   - Block { } = a closet inside the bedroom (if, for, etc.).
// Inner rooms can see outward. Outer rooms CAN'T see inward.
// ---------------------------------------------

const shopName = "Code Café"; // global

function makeOrder(item) {
  const orderNumber = 42; // function scope

  if (item === "pie") {
    const topping = "ice cream"; // block scope
    console.log(`${shopName} order #${orderNumber}: ${item} with ${topping}`);
  }

  // 🤔 Can we use `topping` here? Uncomment to find out, then re-comment.
  // console.log(topping);

  return orderNumber;
}

makeOrder("pie");

// 🤔 Can we use `orderNumber` out here? Uncomment to find out, then re-comment.
// console.log(orderNumber);

// TODO 4: Get the order number OUT of makeOrder the right way:
// store makeOrder's RETURN value in a variable called `myOrder` and log it.



// ---------------------------------------------
// 5. ReferenceError LAB 🔬
// "ReferenceError: X is not defined" means:
//   JavaScript looked for a variable named X in every room it can see
//   and didn't find it.
// The 3 usual suspects:
//   a) a typo (shopname vs shopName)
//   b) using it outside its scope (the closet problem above)
//   c) using a `let`/`const` before the line that creates it
//
// Uncomment ONE line at a time. Read the error. Then FIX it so it works.
// ---------------------------------------------

// a) Typo
// console.log("Welcome to " + shopname);

// b) Out of scope
// function getSpecial() { const special = "Mango smoothie"; }
// getSpecial();
// console.log(special);

// c) Used too early
// console.log(dessert);
// const dessert = "brownie";
