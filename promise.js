/*
========================================================
PROMISES - COMPLETE GUIDE (WITH DEFINITIONS)
Run: node promise.js
========================================================

GLOBAL DEFINITION:
A Promise is an object that represents the eventual result
(success or failure) of an asynchronous operation.

CORE IDEA:
- Placeholder for a future value
- Avoids callback hell
- Uses microtask queue

STATES:
1. pending   → initial state
2. fulfilled → resolve() called
3. rejected  → reject() called

NOTE:
Once settled → cannot change state
*/

console.log("\n===== START =====\n");


/*
========================================================
1. PROMISE CREATION
========================================================

DEFINITION:
A Promise is created using the Promise constructor which
accepts an executor function.

IMPORTANT:
- Executor runs immediately (synchronous)
- resolve() → success
- reject() → failure
*/

const basicPromise = new Promise((resolve, reject) => {
    console.log("1. Executor runs immediately");

    const success = true;

    if (success) {
        resolve("Promise resolved");
    } else {
        reject("Promise rejected");
    }
});

basicPromise
    .then(res => console.log("1 Result:", res))
    .catch(err => console.log("1 Error:", err));


/*
========================================================
2. ASYNCHRONOUS PROMISE
========================================================

DEFINITION:
Promises are mainly used to handle asynchronous operations
like API calls, DB queries, timers.

EXPLANATION:
setTimeout simulates an async operation (like API request)
*/

const asyncPromise = new Promise((resolve) => {
    setTimeout(() => {
        resolve("Data received from API");
    }, 1000);
});

asyncPromise.then(res => console.log("2:", res));


/*
========================================================
3. THEN & CATCH
========================================================

DEFINITION:
.then() → handles resolved value
.catch() → handles rejected value or errors

IMPORTANT RULE:
Any error thrown inside .then automatically goes to .catch
*/

Promise.resolve("Success")
    .then(res => {
        console.log("3:", res);
        throw new Error("Something went wrong");
    })
    .catch(err => console.log("3 Caught:", err.message));


/*
========================================================
4. PROMISE CHAINING
========================================================

DEFINITION:
Chaining means executing multiple async operations in sequence.

RULE:
Always return the next Promise inside .then()

EXPLANATION:
Each .then returns a new Promise → forms a chain
*/

function fetchUser() {
    return Promise.resolve({ id: 1, name: "Mudit" });
}

function fetchOrders(user) {
    return Promise.resolve(["order1", "order2"]);
}

function fetchPayment(orders) {
    return Promise.resolve("Payment completed");
}

fetchUser()
    .then(user => {
        console.log("4 User:", user);
        return fetchOrders(user);
    })
    .then(orders => {
        console.log("4 Orders:", orders);
        return fetchPayment(orders);
    })
    .then(payment => console.log("4 Payment:", payment))
    .catch(err => console.error("4 Error:", err));


/*
========================================================
5. CALLBACK HELL → PROMISE SOLUTION
========================================================

DEFINITION:
Callback hell = deeply nested callbacks → hard to read

SOLUTION:
Promises flatten the structure using chaining

EXPLANATION:
Instead of nesting → we chain operations line by line
*/

function step1() {
    return Promise.resolve("Step 1 done");
}

function step2() {
    return Promise.resolve("Step 2 done");
}

function step3() {
    return Promise.resolve("Step 3 done");
}

step1()
    .then(res => {
        console.log("5:", res);
        return step2();
    })
    .then(res => {
        console.log("5:", res);
        return step3();
    })
    .then(res => console.log("5:", res));


/*
========================================================
6. PROMISE.ALL
========================================================

DEFINITION:
Runs multiple promises in parallel

BEHAVIOR:
✔ Resolves when ALL succeed
❌ Rejects if ANY fails

USE CASE:
Multiple API calls at same time
*/

Promise.all([
    Promise.resolve("A"),
    new Promise(res => setTimeout(() => res("B"), 500)),
    Promise.resolve("C")
])
.then(res => console.log("6 ALL:", res))
.catch(err => console.log("6 Error:", err));


/*
========================================================
7. PROMISE.ALLSETTLED
========================================================

DEFINITION:
Waits for all promises to complete (success or failure)

USE CASE:
When you need results of all operations regardless of failure
*/

Promise.allSettled([
    Promise.resolve("Success"),
    Promise.reject("Failure")
])
.then(res => console.log("7 ALLSETTLED:", res));


/*
========================================================
8. PROMISE.RACE
========================================================

DEFINITION:
Returns the first settled promise (success OR failure)

USE CASE:
Timeout handling, fastest response
*/

Promise.race([
    new Promise(res => setTimeout(() => res("Fast"), 200)),
    new Promise(res => setTimeout(() => res("Slow"), 500))
])
.then(res => console.log("8 RACE:", res));


/*
========================================================
9. PROMISE.ANY
========================================================

DEFINITION:
Returns the first SUCCESSFUL promise

NOTE:
Ignores rejected promises unless all fail
*/

Promise.any([
    Promise.reject("Error"),
    Promise.resolve("First success")
])
.then(res => console.log("9 ANY:", res))
.catch(err => console.log("9 Error:", err));


/*
========================================================
10. FINALLY
========================================================

DEFINITION:
Runs after promise settles (success or failure)

USE CASE:
Cleanup operations (closing DB, loaders, etc.)
*/

Promise.resolve("Done")
    .finally(() => console.log("10 Cleanup done"));


/*
========================================================
11. MICROTASK vs MACROTASK
========================================================

DEFINITION:
JavaScript uses queues to execute async code.

ORDER:
1. Sync code
2. Microtask queue (Promises)
3. Macrotask queue (setTimeout)

IMPORTANT:
Promises execute BEFORE setTimeout
*/

console.log("11 Start");

setTimeout(() => console.log("11 Timeout"), 0);

Promise.resolve().then(() => console.log("11 Promise"));

console.log("11 End");


/*
========================================================
12. ASYNC / AWAIT
========================================================

DEFINITION:
Syntactic sugar over Promises

ADVANTAGE:
- Cleaner code
- Looks synchronous
*/

async function runAsync() {
    try {
        const user = await fetchUser();
        const orders = await fetchOrders(user);
        const payment = await fetchPayment(orders);

        console.log("12 Async:", payment);
    } catch (err) {
        console.error("12 Error:", err);
    }
}

runAsync();


/*
========================================================
13. SEQUENTIAL vs PARALLEL
========================================================

DEFINITION:
Sequential → one after another
Parallel → run together

IMPORTANT:
Parallel is faster when tasks are independent
*/

async function sequential() {
    console.time("Sequential");

    await new Promise(r => setTimeout(r, 500));
    await new Promise(r => setTimeout(r, 500));

    console.timeEnd("Sequential");
}

async function parallel() {
    console.time("Parallel");

    await Promise.all([
        new Promise(r => setTimeout(r, 500)),
        new Promise(r => setTimeout(r, 500))
    ]);

    console.timeEnd("Parallel");
}

sequential().then(parallel);


/*
========================================================
INTERVIEW ONE-LINER
========================================================

"A Promise is an object representing the eventual result
of an asynchronous operation, executed via the microtask
queue, providing a cleaner alternative to callbacks."
*/

console.log("\n===== END =====\n");