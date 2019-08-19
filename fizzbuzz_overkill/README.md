# FizzBuzz Overkill

## Features

- Fully test-driven!
- Functional programming! (sort of)
- Extensible! (that's a lie)
- Low fat!

I set out to make the most refactored version of FizzBuzz I could think of. I'm unsure where else I could take it from here (except inlining a few variables). I could certainly bring in a library for some of the iterators.

I spent nearly three hours on this. I did have a sandwich in the middle though.

## Setup & Running

- Install Node.js
- Get the code (git clone or just copy it)
- for linting, you can run `npm install` followed by `npm run lint`
- In your termimal, run `npm run test` to run the tests.

## Issues / Analysis

The number sequence checker `isMultipleOf` takes a numerator and a denominator. It assumes you're checking the existence of `n` (numerator) in the set defined as the integers scaled by `d` (denominator). In other words, is `n` in [ ... -2d, -d, 0, d, 2d ... ].

The order of matches is dependent on the order of keys in the hash... Oh right, theres no ordered hash in Javascript. Nevertheless, it seems to always perform the checks in ascending order of keys. Does it really matter for this case if we get 'buzzfizz' instead of 'fizzbuzz'? Or do we only care that the correct substrings are returned? Admittedly the tests assume the former, where I'd choose the latter.

And just look at those lovely tests! Really they should be in two files (for each function tested). They should be a proper test framework too - why reinvent the wheel? Sure, I *like* the whole `withSubject` concept, very good for simple input->output functions, removes a lot of duplication,
certainly good enough for this function, uses Node's `assert` so no additional libraries... I take it back, those tests are awesome as they are. Unless you want to test a function with more than one argument, which is why I was passing around arrays quite early on (check the history).
