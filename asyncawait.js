/*
========================================================
ASYNC / AWAIT - COMPLETE GUIDE (3+ YEARS LEVEL)
Run: node asyncAwait.js
========================================================

DEFINITION:

async/await is syntactic sugar over Promises that allows
writing asynchronous code in a synchronous-looking way.

CORE IDEA:
- async → makes a function return a Promise
- await → pauses execution until Promise resolves

IMPORTANT:
- JavaScript is still NON-BLOCKING
- await pauses ONLY the async function, NOT the thread
========================================================
*/

console.log("\n===== START =====\n");


/*
========================================================
1. BASIC ASYNC FUNCTION
========================================================

DEFINITION:
An async function ALWAYS returns a Promise

EXPLANATION:
- Even if you return a normal value → it becomes Promise.resolve(value)
- You can use .then() on it

FLOW:
Return value → wrapped into Promise → consumed via .then()
*/

async function basicExample() {
    return "Hello Async";
}

basicExample().then(res => console.log("1:", res));

/*
OUTPUT:
1: Hello Async
*/


/*
========================================================
2. AWAIT KEYWORD
========================================================

DEFINITION:
await pauses execution until Promise resolves

EXPLANATION:
- JS engine pauses this function
- Moves execution to event loop
- Resumes when Promise resolves

IMPORTANT:
- await only works inside async functions
*/

function getData() {
    return new Promise(resolve => {
        setTimeout(() => resolve("Data received"), 1000);
    });
}

async function awaitExample() {
    console.log("2 Start");

    const data = await getData(); // pause here
    console.log("2 Data:", data);

    console.log("2 End");
}

awaitExample();

/*
OUTPUT:
2 Start
(after 1 sec)
2 Data: Data received
2 End
*/


/*
========================================================
3. SEQUENTIAL EXECUTION
========================================================

DEFINITION:
Tasks run one after another

EXPLANATION:
- Each await blocks next line
- Total time = sum of all waits

USE CASE:
When operations depend on each other
*/

async function sequential() {
    console.time("Sequential");

    const a = await new Promise(r => setTimeout(() => r("A"), 1000));
    const b = await new Promise(r => setTimeout(() => r("B"), 1000));

    console.log("3:", a, b);

    console.timeEnd("Sequential");
}

sequential();

/*
OUTPUT:
(after 2 sec)
3: A B
Sequential: ~2000ms
*/


/*
========================================================
4. PARALLEL EXECUTION
========================================================

DEFINITION:
Run independent tasks together using Promise.all

EXPLANATION:
- All Promises start at same time
- Faster execution

USE CASE:
Independent API calls
*/

async function parallel() {
    console.time("Parallel");

    const [a, b] = await Promise.all([
        new Promise(r => setTimeout(() => r("A"), 1000)),
        new Promise(r => setTimeout(() => r("B"), 1000))
    ]);

    console.log("4:", a, b);

    console.timeEnd("Parallel");
}

parallel();

/*
OUTPUT:
(after 1 sec)
4: A B
Parallel: ~1000ms
*/


/*
========================================================
5. ERROR HANDLING
========================================================

DEFINITION:
Use try/catch to handle async errors

EXPLANATION:
- await throws error if Promise rejects
- catch handles rejection

BEST PRACTICE:
Always wrap await in try/catch
*/

function getError() {
    return new Promise((_, reject) => {
        setTimeout(() => reject("Something failed"), 1000);
    });
}

async function errorHandling() {
    try {
        const data = await getError();
        console.log(data);
    } catch (err) {
        console.log("5 Error:", err);
    }
}

errorHandling();

/*
OUTPUT:
(after 1 sec)
5 Error: Something failed
*/


/*
========================================================
6. MIXING PROMISE + ASYNC
========================================================

NOTE:
- async/await is built on Promises
- You can still use .then()
*/

async function mixedExample() {
    return "Mixed Example";
}

mixedExample().then(res => console.log("6:", res));

/*
OUTPUT:
6: Mixed Example
*/


/*
========================================================
7. NON-BLOCKING BEHAVIOR
========================================================

DEFINITION:
await does NOT block JavaScript thread

EXPLANATION:
- Only pauses current async function
- Other code continues

IMPORTANT:
JS remains single-threaded but non-blocking
*/

async function nonBlocking() {
    console.log("7 Start");

    const data = await new Promise(r => setTimeout(() => r("Done"), 2000));

    console.log("7 Data:", data);
}

nonBlocking();

console.log("7 Outside continues");

/*
OUTPUT:
7 Start
7 Outside continues
(after 2 sec)
7 Data: Done
*/


/*
========================================================
8. LOOP WITH AWAIT
========================================================

PROBLEM:
await inside loop → sequential execution

EXPLANATION:
Each iteration waits → slow

BETTER:
Use Promise.all for parallel
*/

async function loopExample() {
    console.time("Loop");

    for (let i = 1; i <= 3; i++) {
        const res = await new Promise(r => setTimeout(() => r(i), 1000));
        console.log("8:", res);
    }

    console.timeEnd("Loop");
}

loopExample();

/*
OUTPUT:
(after 1 sec) 8: 1
(after 2 sec) 8: 2
(after 3 sec) 8: 3
Loop: ~3000ms
*/


/*
========================================================
9. REAL WORLD EXAMPLE
========================================================

SCENARIO:
User → Orders → Payment

EXPLANATION:
- Each step depends on previous
- Sequential flow required
*/

function fetchUser() {
    return Promise.resolve({ id: 1 });
}

function fetchOrders(user) {
    return Promise.resolve(["order1", "order2"]);
}

function fetchPayment(orders) {
    return Promise.resolve("Payment success");
}

async function realWorldFlow() {
    try {
        const user = await fetchUser();
        const orders = await fetchOrders(user);
        const payment = await fetchPayment(orders);

        console.log("9 Final:", payment);
    } catch (err) {
        console.error(err);
    }
}

realWorldFlow();

/*
OUTPUT:
9 Final: Payment success
*/


/*
========================================================
🔥 FINAL INTERVIEW INSIGHT
========================================================

1. async always returns Promise
2. await pauses function, not thread
3. Sequential vs Parallel matters for performance
4. Always handle errors with try/catch
5. Promise.all is key optimization

INTERVIEW ONE-LINER:

"async/await simplifies Promise handling by allowing
asynchronous code to be written in a synchronous style
while maintaining non-blocking execution."
========================================================
*/

console.log("\n===== END =====\n");