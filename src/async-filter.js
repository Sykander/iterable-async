const { mapIterable, filterIterable } = require('./helpers'),
	{ validateIsIterable, validateIsFunction } = require('./validation');

/**
 * Async Filter
 * ============
 * Filter asynchronously and resolve when all callbacks are resolved
 * @async
 * @param {Object} iterable
 * @param {Function} callback - callback(currentValue, index, array)
 * @param {Object} [thisArg=undefined]
 * @return {Array}
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
