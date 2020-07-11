const { mapIterable } = require('./helpers'),
	{ validateIsIterable, validateIsFunction } = require('./validation');

/**
 * Async For Each
 * ==============
 * Loop asynchronously and resolve when all callbacks are resolved
 * @async
 * @param {Object} iterable
 * @param {Function} callback - callback(currentValue, index, array)
 * @param {Object} [thisArg=undefined]
 * @throws {TypeError}
 */
async function asyncForEach(iterable, callback, thisArg = undefined) {
	validateIsIterable(iterable);
	validateIsFunction(callback);

	await Promise.all(
		mapIterable(iterable, callback.bind(thisArg), {
			useEmptyElements: false
		})
	);
}

module.exports = { asyncForEach };
