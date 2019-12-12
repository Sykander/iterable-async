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

## Async Find Index

```
/**
* Async Find Index
* Find an item's index in an iterable object asynchronously and resolve when found or all callbacks resolve
* @async
* @param {Function} callback - callback(currentValue, index, array)
* @param {Object} [thisArg] - must be iterable
* @return {Number} - an integer index, -1 if not found
* @throws {TypeError}
*/
```

# Development

## Scripts

```
npm run lint
# Lints the project and returns a report

npm run lint:check
# Returns a report on lint issues in the project

npm run lint:fix
# Fixes lint issues in the project and returns a report on the ones which couldn't be fixed

npm test
# Runs all tests
```

## Commit Rules

* All commits should pass the lint check commandS