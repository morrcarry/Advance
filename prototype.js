/*
========================================================
CONSTRUCTOR FUNCTIONS & PROTOTYPE - COMPLETE NOTES
========================================================

DEFINITION:

A constructor function is a regular function used with the 'new' keyword
to create multiple objects with similar structure.

By convention, constructor functions start with a CAPITAL letter.
*/




/*
========================================================
CONSTRUCTOR FUNCTION
========================================================
*/

function Person(fName, lName) {
    this.firstName = fName;
    this.lastName = lName;
}

/*
What happens internally when using 'new Person()':

1. A new empty object is created → {}
2. 'this' points to that object
3. Properties are assigned → firstName, lastName
4. Object is returned automatically
*/




/*
========================================================
CREATING OBJECTS
========================================================
*/

const person1 = new Person("Bruce", "Wayne");
const person2 = new Person("Clark", "Kent");




/*
========================================================
ADDING METHOD DIRECTLY TO OBJECT (NOT RECOMMENDED)
========================================================
*/

person1.getFullName = function () {
    return this.firstName + " " + this.lastName;
};

console.log(person1.getFullName()); // Bruce Wayne

/*
Problem:
- Method is added ONLY to person1
- person2 does NOT have this method
- Memory inefficient (duplicate methods)
*/

// console.log(person2.getFullName()); ❌ Error




/*
========================================================
USING PROTOTYPE (BEST PRACTICE)
========================================================
*/

Person.prototype.getFullName = function () {
    return this.firstName + " " + this.lastName;
};

/*
Now BOTH objects can access the method
because they share the same prototype
*/

console.log(person1.getFullName()); // Bruce Wayne
console.log(person2.getFullName()); // Clark Kent




/*
========================================================
HOW PROTOTYPE WORKS (VERY IMPORTANT)
========================================================

When you call:

person1.getFullName()

JS looks in:

1. person1 object → not found?
2. person1.__proto__ → (Person.prototype) → FOUND

This is called the "prototype chain"
*/




/*
========================================================
KEY DIFFERENCE
========================================================

Direct Method (BAD):
- Stored separately on each object
- Wastes memory
- Not reusable

Prototype Method (GOOD):
- Shared across all instances
- Memory efficient
- Cleaner design
*/




/*
========================================================
IMPORTANT NOTE ON NAMING
========================================================

function Person() {}   // ✔ Recommended (constructor)
function person() {}   // ❌ Not recommended (confusing)

WHY?
- Capital letter signals usage with 'new'
- Prevents mistakes like calling without 'new'
*/




/*
========================================================
INTERVIEW ONE-LINER
========================================================

"Constructor functions create objects using the 'new' keyword, and methods
should be added to the prototype so that all instances share the same function,
improving memory efficiency and reusability."
*/




/*
========================================================
MODERN ALTERNATIVE (ES6 CLASS)
========================================================
*/

class PersonClass {
    constructor(fName, lName) {
        this.firstName = fName;
        this.lastName = lName;
    }

    getFullName() {
        return this.firstName + " " + this.lastName;
    }
}

const p1 = new PersonClass("Tony", "Stark");
console.log(p1.getFullName()); // Tony Stark

/*
Behind the scenes:
- Classes also use prototypes internally
*/