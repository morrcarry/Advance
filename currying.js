/*
===========================
FUNCTION CURRYING - DEFINITION
===========================

Currying is a technique in functional programming where a function with multiple
arguments is transformed into a sequence of nested functions, each taking
one argument at a time.

Instead of:
    fn(a, b, c)

We convert it into:
    fn(a)(b)(c)

This allows partial application and better control over function execution.
*/




/*
===========================
NORMAL FUNCTION
===========================
*/

function sum(a, b, c) {
    return a + b + c;
}

console.log(sum(1, 2, 3)); // Output: 6

/*
Explanation:
- This is a normal function taking 3 arguments at once.
*/




/*
===========================
CURRY FUNCTION
===========================
*/

function curry(fn) {
    return function (a) {
        return function (b) {
            return function (c) {
                return fn(a, b, c);
            };
        };
    };
}

/*
Explanation:
- curry() takes a function (fn)
- It returns nested functions:
    First call → takes 'a'
    Second call → takes 'b'
    Third call → takes 'c'
- Finally calls original function with all values
*/




/*
===========================
USING CURRIED FUNCTION
===========================
*/

const curriedSum = curry(sum);

// Calling step-by-step
console.log(curriedSum(2)(3)(5)); // Output: 10

/*
Execution flow:

curriedSum(2)
    → returns function(b)

(3)
    → returns function(c)

(5)
    → calls sum(2, 3, 5)
    → returns 10
*/




/*
===========================
PARTIAL APPLICATION
===========================
*/

const add2 = curriedSum(2);
console.log(add2);

/*
add2 is now:
function(b) {
    return function(c) {
        return sum(2, b, c);
    };
}
*/

const add3 = add2(3);
console.log(add3);

/*
add3 is now:
function(c) {
    return sum(2, 3, c);
}
*/

const add4 = add3(5);
console.log(add4); // Output: 10

/*
Final execution:
sum(2, 3, 5) → 10
*/




/*
===========================
KEY CONCEPTS
===========================

1. Currying converts:
   fn(a, b, c) → fn(a)(b)(c)

2. Each function remembers previous arguments
   (this works because of closures)

3. Enables partial application:
   - Fix some arguments early
   - Use remaining later

4. Improves code reusability and flexibility
*/




/*
===========================
INTERVIEW ONE-LINER
===========================

"Currying is a technique where a function with multiple arguments is transformed
into a sequence of functions each taking a single argument, enabling partial
application and better function reuse."
*/




/*
===========================
REAL-WORLD USE CASE
===========================

Example: Logging

function log(type) {
    return function(message) {
        console.log(`[${type}] ${message}`);
    };
}

const errorLog = log("ERROR");
errorLog("Something went wrong");
[ERROR] Something went wrong
*/