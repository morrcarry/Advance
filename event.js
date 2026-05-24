/*
========================================================
NODE.JS EVENT LOOP - COMPLETE GUIDE (3+ YEARS LEVEL)
Run: node nodeEventLoop.js
========================================================

DEFINITION:

The Node.js event loop is a mechanism powered by libuv
that handles asynchronous operations using different
phases and queues.

IMPORTANT:
- JavaScript is single-threaded
- Node uses libuv (C++ library) for async operations
- Event loop manages execution flow

========================================================
NODE EVENT LOOP PHASES
========================================================

1. TIMERS
   → setTimeout, setInterval

2. PENDING CALLBACKS
   → system-level callbacks

3. IDLE / PREPARE
   → internal use

4. POLL (MOST IMPORTANT)
   → I/O operations (fs, network)

5. CHECK
   → setImmediate()

6. CLOSE CALLBACKS
   → socket close etc.

--------------------------------------------------------
MICROTASK PRIORITY (VERY IMPORTANT)
--------------------------------------------------------

Priority Order:
1. process.nextTick()
2. Promise (microtask)
3. Macrotask (setTimeout, setImmediate)

NOTE:
Microtasks run AFTER each phase
========================================================
*/

console.log("\n===== START =====\n");


/*
========================================================
1. BASIC SYNC EXECUTION
========================================================

DEFINITION:
Synchronous code runs immediately in call stack
*/

console.log("1 Sync Start");
console.log("1 Sync End");

/*
OUTPUT:
1 Sync Start
1 Sync End
*/


/*
========================================================
2. setTimeout (TIMERS PHASE)
========================================================

DEFINITION:
Runs in timers phase
*/

setTimeout(() => {
    console.log("2 setTimeout");
}, 0);

/*
OUTPUT:
2 setTimeout (after sync & microtasks)
*/


/*
========================================================
3. setImmediate (CHECK PHASE)
========================================================

DEFINITION:
Runs in CHECK phase (after poll)
*/

setImmediate(() => {
    console.log("3 setImmediate");
});

/*
OUTPUT:
3 setImmediate (order may vary with setTimeout)
*/


/*
========================================================
4. process.nextTick (HIGHEST PRIORITY)
========================================================

DEFINITION:
Runs BEFORE all other queues

IMPORTANT:
- Executes immediately after current operation
*/

process.nextTick(() => {
    console.log("4 nextTick");
});

/*
OUTPUT:
4 nextTick (runs before Promise)
*/


/*
========================================================
5. PROMISE (MICROTASK)
========================================================

DEFINITION:
Runs after nextTick but before macrotasks
*/

Promise.resolve().then(() => {
    console.log("5 Promise");
});

/*
OUTPUT:
5 Promise
*/


/*
========================================================
6. EXECUTION ORDER DEMO
========================================================
*/

console.log("6 Start");

setTimeout(() => console.log("6 Timeout"), 0);

setImmediate(() => console.log("6 Immediate"));

process.nextTick(() => console.log("6 nextTick"));

Promise.resolve().then(() => console.log("6 Promise"));

console.log("6 End");

/*
EXPECTED OUTPUT (Node):

6 Start
6 End
6 nextTick
6 Promise
6 Timeout / 6 Immediate (order NOT guaranteed)

EXPLANATION:
1. Sync → Start, End
2. nextTick → highest priority
3. Promise → microtask
4. Timers & Immediate → depends on phase
*/


/*
========================================================
7. I/O + setImmediate (IMPORTANT INTERVIEW)
========================================================

RULE:
Inside I/O → setImmediate runs before setTimeout
*/

const fs = require("fs");

fs.readFile(__filename, () => {
    console.log("7 I/O callback");

    setTimeout(() => console.log("7 Timeout"), 0);
    setImmediate(() => console.log("7 Immediate"));
});

/*
EXPECTED OUTPUT:

7 I/O callback
7 Immediate
7 Timeout

WHY:
- After I/O → goes to CHECK phase first
- setImmediate runs before timers
*/


/*
========================================================
8. MICROTASK INSIDE MACROTASK
========================================================
*/

setTimeout(() => {
    console.log("8 Timeout");

    Promise.resolve().then(() => console.log("8 Promise inside Timeout"));
}, 0);

/*
OUTPUT:
8 Timeout
8 Promise inside Timeout

RULE:
Microtasks always run AFTER current macrotask
*/


/*
========================================================
🔥 FINAL INTERVIEW RULES
========================================================

1. Sync runs first
2. process.nextTick runs before everything
3. Promise (microtask) runs next
4. Event loop phases start
5. setTimeout vs setImmediate depends on context
6. Inside I/O → setImmediate wins

========================================================
INTERVIEW ONE-LINER
========================================================

"Node.js event loop is phase-based, with process.nextTick
having highest priority, followed by Promises, and then
macrotasks like setTimeout and setImmediate."

========================================================
*/

console.log("\n===== END =====\n");