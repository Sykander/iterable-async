# Patterns

A Collection of useful patterns.

## Array Methods

### Async Map

```
/**
 * Async Map
 * Map an array asynchronously and resolve when all callbacks are resolved
 * Will map independently from order when callbacks are async
 * @async
 * @param {Function} callback - callback(currentValue, index, array)
 * @param {Object} [thisArg] - must be iterable
 * @return {Array}
 * @throws {TypeError}
 */
function asyncMap(callback, [thisArg]) {...}
```

### Async For Each

```
/**
 * Async For Each
 * Loop over an array asynchronously and resolve when all callbacks are resolved
 * Will loop independently from order when callbacks are async
 * @async
 * @param {Function} callback - callback(currentValue, index, array)
 * @param {Object} [thisArg] - must be iterable
 * @return {Array}
 * @throws {TypeError}
 */
function asyncForEach(callback, [thisArg]) {...}