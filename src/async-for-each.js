const { mapIterable } = require('./helpers'),
	{ validateIsIterable, validateIsFunction } = require('./validation');

/**
 * Async For Each
 *
 * Loop asynchronously and resolve when all callbacks are resolved
 * @async
 * @param {any[]} iterable
 * @param {Function} callback - callback(currentValue, index, array)
 * @param {any} [thisArg=undefined]
 * @return {Promise<void>}
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
