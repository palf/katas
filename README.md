# Action Queue

Code kata for command/retry pattern.

The goal here is to implement a retry mechanism that handles asynchronous calls and retries.
A good example to start with is a dice roll:

- roll a die (expecting some value)
- exit on success
- repeat on failure
- exit after failure limit is exceeded
- execute a success callback or a failure callback
