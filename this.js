/*
========================================================
THIS KEYWORD - COMPLETE DOCUMENTATION (INTERVIEW READY)
========================================================

DEFINITION:

In JavaScript, 'this' refers to the value that is determined at runtime
based on how a function is invoked (call-site), not where it is defined.

IMPORTANT:
- 'this' belongs to function execution, NOT objects
- Objects do NOT create 'this'
*/




/*
========================================================
1. DEFAULT BINDING
========================================================

When a function is called without any object reference,
'this' defaults to:

- global object (non-strict mode)
- undefined (strict mode)
*/

globalThis.name = "Global";

function sayMyName() {
    console.log(this.name);
}

sayMyName(); // Global

/*
Explanation:
- Called as plain function → default binding
- this = globalThis
*/




/*
========================================================
2. IMPLICIT BINDING
========================================================

When a function is called as a method of an object,
'this' refers to that object.
*/

const person = {
    name: "Mudit",
    sayMyName: function () {
        console.log(this.name);
    }
};

person.sayMyName(); // Mudit

/*
Rule:
"Object before dot decides 'this'"
*/




/*
========================================================
3. EXPLICIT BINDING
========================================================

We can manually set 'this' using:
- call()
- apply()
- bind()
*/

function greet(age, city) {
    console.log(`My name is ${this.name}, age ${age}, city ${city}`);
}

const user = { name: "Mudit" };


// CALL → executes immediately
greet.call(user, 25, "Delhi");


// APPLY → executes immediately (arguments as array)
greet.apply(user, [25, "Delhi"]);


// BIND → returns new function (lazy execution)
const boundFn = greet.bind(user, 25, "Delhi");
boundFn();

/*
Key Difference:

call  → immediate execution
apply → immediate execution (array args)
bind  → returns function (no execution until called)
*/




/*
========================================================
4. NEW BINDING (CONSTRUCTOR FUNCTION)
========================================================

When a function is called using 'new':
1. A new object is created
2. 'this' points to that object
3. Function executes
4. Object is returned
*/

function Person(name) {
    this.name = name;
}

const p1 = new Person("Singh");

console.log(p1.name); // Singh




/*
========================================================
5. ARROW FUNCTION (LEXICAL THIS)
========================================================

Arrow functions:
- DO NOT have their own 'this'
- Inherit 'this' from surrounding (lexical) scope
- Ignore call(), apply(), bind()
*/

const obj = {
    name: "Mudit",

    normal: function () {
        console.log("normal:", this.name);
    },

    arrow: () => {
        console.log("arrow:", this.name);
    }
};

obj.normal(); // Mudit
obj.arrow();  // undefined

/*
Explanation:
- arrow defined in global scope
- this = globalThis
*/




/*
========================================================
6. COMMON INTERVIEW TRAP (NESTED FUNCTION)
========================================================
*/

const obj2 = {
    name: "Mudit",
    say: function () {
        function inner() {
            console.log(this.name);
        }
        inner();
    }
};

obj2.say(); // undefined

/*
Reason:
- inner() called as normal function
- default binding → this = global
*/




/*
========================================================
FIXES FOR NESTED FUNCTION
========================================================
*/

// 1. Arrow Function (BEST)
const obj3 = {
    name: "Mudit",
    say: function () {
        const inner = () => {
            console.log(this.name);
        };
        inner();
    }
};

obj3.say(); // Mudit


// 2. bind()
const obj4 = {
    name: "Mudit",
    say: function () {
        function inner() {
            console.log(this.name);
        }
        inner.bind(this)();
    }
};


// 3. store this (old approach)
const obj5 = {
    name: "Mudit",
    say: function () {
        const self = this;
        function inner() {
            console.log(self.name);
        }
        inner();
    }
};




/*
========================================================
7. METHOD EXTRACTION PROBLEM (IMPORTANT)
========================================================
*/

const obj6 = {
    name: "Mudit",
    say: function () {
        console.log(this.name);
    }
};

const fn = obj6.say;
fn(); // undefined

/*
Reason:
- function lost its object reference
- default binding applies
*/




/*
========================================================
8. PRIORITY ORDER OF 'this'
========================================================

1. new binding        (highest priority)
2. explicit binding   (call/apply/bind)
3. implicit binding   (object.method)
4. default binding    (lowest)
*/




/*
========================================================
9. KEY TAKEAWAYS
========================================================

1. 'this' depends on how function is called
2. Objects do NOT have their own 'this'
3. Arrow functions inherit 'this' from outer scope
4. call/apply/bind override 'this'
5. 'new' has highest priority
*/




/*
========================================================
INTERVIEW ONE-LINER
========================================================

"'this' in JavaScript is determined by the function invocation context
and follows four rules: new binding, explicit binding, implicit binding,
and default binding."
*/