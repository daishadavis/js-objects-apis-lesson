// =============================================
// 01 · How Data Travels Between Functions — SOLUTION
// =============================================

console.log("01 loaded ✅");

// ---------------------------------------------
// 1. PARAMETERS vs ARGUMENTS
// ---------------------------------------------

function calculateTip(bill, percent) {
  return bill * (percent / 100);
}

console.log("Tip:", calculateTip(50, 20)); // 10

// TODO 1
console.log("Tip on $80 at 25%:", calculateTip(80, 25)); // 20


// ---------------------------------------------
// 2. RETURN VALUES
// ---------------------------------------------

function formatMoney(amount) {
  return "$" + amount.toFixed(2);
}

// Before TODO 2 this logged `undefined` (no return = undefined).
console.log("Formatted:", formatMoney(12.5)); // "$12.50"


// ---------------------------------------------
// 3. A PIPELINE
// ---------------------------------------------

function calculateTotal(bill, tip) {
  return bill + tip;
}

function printReceipt(bill, percent) {
  const tip = calculateTip(bill, percent);   // 6
  const total = calculateTotal(bill, tip);   // 46
  const pretty = formatMoney(total);         // "$46.00"
  return `Bill: ${formatMoney(bill)} | Tip: ${formatMoney(tip)} | Total: ${pretty}`;
}

console.log(printReceipt(40, 15));

// TODO 3 — the trace for printReceipt(40, 15):
//   tip    = calculateTip(40, 15)    = 40 * 0.15 = 6
//   total  = calculateTotal(40, 6)   = 46
//   pretty = formatMoney(46)         = "$46.00"


// ---------------------------------------------
// 4. SCOPE
// ---------------------------------------------

const shopName = "Code Café"; // global

function makeOrder(item) {
  const orderNumber = 42; // function scope

  if (item === "pie") {
    const topping = "ice cream"; // block scope
    console.log(`${shopName} order #${orderNumber}: ${item} with ${topping}`);
  }

  // console.log(topping); → ReferenceError: topping only lives inside the if { } block

  return orderNumber;
}

makeOrder("pie");

// console.log(orderNumber); → ReferenceError: orderNumber only lives inside makeOrder

// TODO 4: the right way to get data OUT of a function is to RETURN it
const myOrder = makeOrder("cake");
console.log("My order number:", myOrder); // 42


// ---------------------------------------------
// 5. ReferenceError LAB — fixed versions
// ---------------------------------------------

// a) Typo → match the exact spelling (JavaScript is case-sensitive)
console.log("Welcome to " + shopName);

// b) Out of scope → return the value and catch it in a variable
function getSpecial() {
  const special = "Mango smoothie";
  return special;
}
const special = getSpecial();
console.log("Today's special:", special);

// c) Used too early → create it BEFORE you use it
const dessert = "brownie";
console.log("Dessert:", dessert);
