const { mapIterable, filterIterable } = require('./helpers'),
	{ validateIsIterable, validateIsFunction } = require('./validation');

/**
 * Async Filter
 * ============
 * Filter an iterable object asynchronously and resolve when all callbacks are resolved
 * @async
 * @param {Function} callback - callback(currentValue, index, array)
 * @param {Object} [thisArg=undefined]
 * @return {Array}
 * @throws {TypeError}
 */
module.exports = async function asyncFilter(callback, thisArg = undefined) {
	validateIsIterable(this);
	validateIsFunction(callback);

	return filterIterable(
		this,
		await Promise.all(
			mapIterable(this, callback.bind(thisArg), {
				useEmptyElements: false,
				newlyAddedElements: false
			})
		)
	);
};
