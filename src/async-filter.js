const { mapIterable, filterIterable } = require('./helpers'),
	{ validateIsIterable, validateIsFunction } = require('./validation');

/**
 * Async Filter
 *
 * Filter asynchronously and resolve when all callbacks are resolved
 * @async
 * @param {any[]} iterable
 * @param {Function} callback - callback(currentValue, index, array)
 * @param {any} [thisArg=undefined]
 * @return {Promise<any[]>}
 * @throws {TypeError}
 */
async function asyncFilter(iterable, callback, thisArg = undefined) {
	validateIsIterable(iterable);
	validateIsFunction(callback);

	return filterIterable(
		iterable,
		await Promise.all(
			mapIterable(iterable, callback.bind(thisArg), {
				useEmptyElements: false
			})
		)
	);
}

module.exports = { asyncFilter };
