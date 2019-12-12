# Iterable Async Methods

## Async Map

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

## Async For Each

```
/**
 * Async For Each
 * Loop over an array asynchronously and resolve when all callbacks are resolved
 * Will loop independently from order when callbacks are async
 * @async
 * @param {Function} callback - callback(currentValue, index, array)
 * @param {Object} [thisArg] - must be iterable
 * @throws {TypeError}
 */
function asyncForEach(callback, [thisArg]) {...}
```

## Async Filter 

```
/**
 * Async Filter
 * Filter an iterable object asynchronously and resolve when all callbacks are resolved
 * @async
 * @param {Function} callback - callback(currentValue, index, array)
 * @param {Object} [thisArg] - must be iterable
 * @return {Array}
 * @throws {TypeError}
 */
 function asyncFilter(callback, [thisArg]) {...}
 ```

 ## Async Find

 ```
 /**
 * Async Find
 * Find an item in an iterable object asynchronously and resolve when found or all callbacks resolve
 * @async
 * @param {Function} callback - callback(currentValue, index, array)
 * @param {Object} [thisArg] - must be iterable
 * @return {any}
 * @throws {TypeError}
 */
 ```