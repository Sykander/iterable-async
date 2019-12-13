const {
	asyncFind,
	asyncFindIndex,
	asyncFilter,
	asyncForEach,
	asyncMap
} = require('./index');

/**
 * Create new constructor for Async Array
 */
class AsyncArray extends Array {}

/**
 * Bind Async Iterable Methods to the prototype
 */
AsyncArray.prototype = Object.assign(AsyncArray.prototype, {
	asyncFind,
	asyncFindIndex,
	asyncFilter,
	asyncForEach,
	asyncMap
});

module.exports = AsyncArray;
