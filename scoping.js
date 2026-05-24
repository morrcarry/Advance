// ======================
// 1. FUNCTION SCOPE
// ======================

function test() {
  var a = 10;   // function-scoped
  let b = 20;   // block-scoped (inside function block)
  const c = 30; // block-scoped (inside function block)

  console.log(a); // ✅ 10 (accessible inside function)
  console.log(b); // ✅ 20
  console.log(c); // ✅ 30
}

test();

// Outside function → NOT accessible
// console.log(a); // ❌ ReferenceError (a is inside function)
// console.log(b); // ❌ ReferenceError
// console.log(c); // ❌ ReferenceError



// ======================
// 2. BLOCK SCOPE
// ======================

{
  var x = 10;   // ❗ NOT block scoped → leaks outside
  let y = 20;   // ✅ block scoped
  const z = 30; // ✅ block scoped

  console.log(x); // ✅ 10 (inside block)
  console.log(y); // ✅ 20
  console.log(z); // ✅ 30
}

// Outside block
console.log(x); // ✅ 10 (var ignores block)

// console.log(y); // ❌ ReferenceError (block scoped)
// console.log(z); // ❌ ReferenceError (block scoped)



// ======================
// 3. IMPORTANT DIFFERENCE (INTERVIEW)
// ======================

function demo() {
  if (true) {
    var a = 100;   // function scoped
    let b = 200;   // block scoped
    const c = 300; // block scoped
  }

  console.log(a); // ✅ 100 (accessible in function)
  // console.log(b); // ❌ ReferenceError
  // console.log(c); // ❌ ReferenceError
}

demo();



// ======================
// 4. GLOBAL vs BLOCK CONFUSION
// ======================

var m = 1;
let n = 2;
const o = 3;

{
  var m = 10;   // overwrites global m
  let n = 20;   // new block variable
  const o = 30; // new block variable
}

console.log(m); // ✅ 10 (var overrides)
console.log(n); // ✅ 2  (outer let unchanged)
console.log(o); // ✅ 3  (outer const unchanged)



// ======================
// 5. LOOP BEHAVIOR (VERY IMPORTANT)
// ======================

// var → shared across loop
for (var i = 0; i < 3; i++) {}

console.log(i); // ✅ 3 (accessible outside loop)


// let → block scoped per iteration
for (let j = 0; j < 3; j++) {}

// console.log(j); // ❌ ReferenceError



// ======================
// 6. HOISTING BEHAVIOR
// ======================

// var → hoisted + initialized as undefined
console.log(p); // ✅ undefined
var p = 50;


// let → hoisted but in TDZ
// console.log(q); // ❌ ReferenceError
let q = 60;


// const → hoisted but in TDZ
// console.log(r); // ❌ ReferenceError
const r = 70;