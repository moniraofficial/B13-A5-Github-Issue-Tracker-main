<!-- >>>>>>>>>> -->
1️⃣ What is the difference between var, let, and const?

Ans: 1. var :
    >> Defination: The original way to declare variables in JavaScript. It is function-scoped, meaning it is visible throughout the function it is declared in.

    >> Scope: Function-scoped (ignores blocks like if or for).

    >> Hoisting: Moves to the top and is initialized as undefined.

    >> Reassignment: Can be reassigned and redeclared.

    >> Verdict: Avoid using this in modern projects.

    2. let:
    >> Definition: A modern way to declare variables that are block-scoped, meaning they only exist within the specific { } (like an if statement or for loop) where they are defined.

    >> Scope: Block-scoped (lives only inside { }).

    >> Hoisting: Hoisted but not initialized (cannot use it before declaration).

    >> Reassignment: Can be reassigned, but not redeclared in the same scope.

    >> Verdict: Use this when you know the value will change (e.g., a counter or a toggle).

    3. const :
    >> Definition: Also block-scoped, but used for values that should remain constant. Once a value is assigned, it is "locked."

    >> Scope: Block-scoped.
    >> Hoisting: Same as let.
    >> Reassignment: Cannot be reassigned or redeclared.
    >> Verdict: Use this by default for everything unless you specifically need to change the value.

<!-- >>>>>>>>>>-->
2️⃣ What is the spread operator (...)?

Ans: The Spread Operator (...) is a syntax that allows an iterable, such as an array or an object, to be expanded (or "spread") into its individual elements or properties.
    It is a tool used to unpack the contents of a data structure (like an array or object) so that they can be used individually in places where multiple arguments or elements are expected.

    Core Uses:
    >> Copying: Creates a shallow copy of an array or object.

    >> const copy = [...originalArray];

    >> Merging: Combines multiple arrays or objects into one.

    >> const combined = [...listA, ...listB];

    >>Expanding: Converts an array into a list of arguments for a function.

    Math.min(...[5, 10, 2]); // Passes 5, 10, and 2 as separate numbers.

<!-- >>>>>>>>>> -->
3️⃣ What is the difference between map(), filter(), and forEach()?

Ans: The main difference between these three array methods lies in their purpose and return value.

    >> map(): Transforms every element in an array and returns a new array of the same length with the modified values.

    >> filter(): Checks every element against a condition and returns a new array containing only the elements that pass the test.

    >> forEach(): Executes a function for every element but returns nothing (undefined). It is used to perform "side effects" (like logging or updating the DOM).

<!-- >>>>>>>>>> -->
4️⃣ What is an arrow function?

Ans: An arrow function is a shorter and modern way to write functions in JavaScript using the => syntax. It makes the code more concise and easier to read.
       
            Example: 

            regular function: 
                function add(a, b) {
                                return a + b;
                                }
                        
            Arrow Function:
                const add = (a, b) => {
                            return a + b;
                            };

            Shorter Version:
                const add = (a, b) => a + b;

<!-- >>>>>>>>>> -->
5️⃣ What are template literals?

Ans: Template literals are a way to write strings in JavaScript using backticks ( ). They allow you to insert variables or expressions inside a string using ${}.

    Example: 
        const name = "Monira";
        console.log(`Hello ${name}`);

