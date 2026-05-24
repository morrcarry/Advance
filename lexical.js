// Global scope: variable 'a' is declared here
let a = 10;

/*
Lexical Scoping Definition:
Lexical scoping means that a function can access variables based on where it is
defined in the source code, not where it is called.
*/

function outer() {
    // 'b' is in the scope of outer()
    let b = 20;

    // inner() is defined inside outer()
    // Because of lexical scoping, inner() has access to:
    // 1. Its own variables
    // 2. outer() variables
    // 3. global variables
    function inner() {
        // 'c' is local to inner()
        let c = 30;

        /*
        Variable Resolution (Scope Chain):

        When JavaScript executes console.log(a, b, c),
        it resolves each variable independently:

        1. Look for 'a':
           - inner scope → not found
           - outer scope → not found
           - global scope → found (a = 10)

        2. Look for 'b':
           - inner scope → not found
           - outer scope → found (b = 20)

        3. Look for 'c':
           - inner scope → found (c = 30)

        This lookup process is called the "Scope Chain":
        inner → outer → global
        */

        console.log(a, b, c); // Output: 10 20 30
    }

    // Calling inner function
    inner();
}

// Calling outer function
outer();

/*
Key Takeaways:

1. Lexical Scope:
   Scope is determined by where the function is written in the code.

2. Scope Chain:
   inner() → outer() → global

3. Each variable is resolved independently:
   JavaScript does NOT search left-to-right or right-to-left for variables.
   It always starts from the current scope and moves outward.

4. Closure Insight:
   inner() forms a closure because it has access to variables (like 'b')
   from its outer function even after definition.

5. Execution Flow:
   - outer() is called
   - inner() is created and executed
   - console.log prints values from different scopes
*/