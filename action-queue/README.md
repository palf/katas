# Action Queue

Code kata for command/retry pattern.

The goal here is to implement a retry mechanism that handles asynchronous calls and retries.
A good example to start with is a simple game:

- flip a coin (expecting true or false)
- exit on success
- repeat on failure
- exit after failure limit is exceeded
- execute a success callback or a failure callback

## Running

    node main.js

This will construct some tasks, chain them together, and run them until they reach their failure limits

## Tasks

    grunt lint

Runs jslint

    grunt spec

Runs unit tests with nodeunit

    grunt watch
    grunt watch:lint
    grunt watch:spec

Keeps linting and/or unit tests running

