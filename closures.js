/*
===========================
CLOSURE - COMPLETE GUIDE
===========================

DEFINITION:

In JavaScript, when we return a function from another function, we are effectively
returning a combination of the function definition along with its lexical scope.

This allows the returned function to "remember" variables from its outer scope
even after the outer function has finished execution.

Closure = Function + its preserved scope (memory)
*/




/*
===========================
EXAMPLE 1: NO CLOSURE
===========================
*/

function outer() {
    let counter = 0;

    function inner() {
        counter++;
        console.log(counter);
    }

    inner();
}

outer(); // 1
outer(); // 1

/*
Explanation:
- Every call creates a new counter
- No memory is preserved
- No closure usage
*/




/*
===========================
EXAMPLE 2: BASIC CLOSURE
===========================
*/

function outer() {
    let counter = 0;

    function inner() {
        counter++;
        console.log(counter);
    }

    return inner;
}

const fn = outer();

fn(); // 1
fn(); // 2
fn(); // 3

/*
Explanation:
- outer() runs once
- inner() remembers counter
- This is closure (persistent memory)
*/




/*
===========================
EXAMPLE 3: MULTIPLE CLOSURES
===========================
*/

const fn1 = outer();
const fn2 = outer();

fn1(); // 1
fn1(); // 2

fn2(); // 1
fn2(); // 2

/*
Explanation:
- Each closure has its own memory
- fn1 and fn2 do NOT share counter
*/




/*
===========================
EXAMPLE 4: GLOBAL + CLOSURE
===========================
*/

let globalVar = 100;

function outerGlobal() {
    let counter = 0;

    return function inner() {
        counter++;
        globalVar++;
        console.log("counter:", counter, "| globalVar:", globalVar);
    };
}

const g1 = outerGlobal();
const g2 = outerGlobal();

g1(); // counter:1 | globalVar:101
g2(); // counter:1 | globalVar:102

/*
Explanation:
- counter → private (closure)
- globalVar → shared across all
*/




/*
===========================
EXAMPLE 5: DATA PRIVACY
===========================
*/

function createUser() {
    let password = "secret";

    return {
        checkPassword: (input) => input === password
    };
}

const user = createUser();

console.log(user.checkPassword("secret")); // true
console.log(user.password); // undefined

/*
Explanation:
- password is hidden
- Only accessible via closure
*/




/*
===========================
EXAMPLE 6: LOOP CLOSURE BUG
===========================
*/

for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 1000);
}

// Output: 3 3 3

/*
Explanation:
- var is function-scoped
- closure captures SAME 'i'
*/




/*
===========================
FIX USING CLOSURE
===========================
*/

for (var i = 0; i < 3; i++) {
    (function(i) {
        setTimeout(() => console.log(i), 1000);
    })(i);
}

// Output: 0 1 2




/*
===========================
FIX USING LET (MODERN WAY)
===========================
*/

for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 1000);
}

// Output: 0 1 2 , because let has block scope




/*
===========================
EXAMPLE 7: MEMORY CONCEPT
===========================
*/

function memoryExample() {
    let largeData = new Array(1000000).fill("data");

    return function () {
        console.log("Using closure");
    };
}

const memFn = memoryExample();

/*
Explanation:
- largeData stays in memory
- because closure still references it
- can lead to memory issues if misused
*/




/*
===========================
KEY TAKEAWAYS
===========================

1. Closure = Function + its lexical scope
2. Variables are preserved after outer function execution
3. Each closure has its own memory
4. Global variables are shared, not part of closure
5. Useful for:
   - Data hiding
   - State management
   - Event handlers
   - Caching
*/




/*
===========================
INTERVIEW ONE-LINER
===========================

"A closure is a function that retains access to variables from its lexical scope
even after the outer function has finished execution."
*/