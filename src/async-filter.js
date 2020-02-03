const { mapIterable, filterIterable } = require('./helpers'),
	{ validateIsIterable, validateIsFunction } = require('./validation');

/**
 * Async Filter
 * ============
 * Filter asynchronously and resolve when all callbacks are resolved
 * @async
 * @param {Function} callback - callback(currentValue, index, array)
 * @param {Object} [thisArg=undefined]
 * @return {Array}
 * @throws {TypeError}
 */
const asyncFilter = (module.exports.asyncFilter = async function asyncFilter(
	callback,
	thisArg = undefined
) {
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
});

/**
 * Async Filter Iterable
 * =====================
 * Filter an iterable object asynchronously and resolve when all callbacks are resolved
 * @async
 * @param {Object} iterable
 * @param {Function} callback - callback(currentValue, index, array)
 * @param {Object} [thisArg=undefined]
 * @return {Array}
 * @throws {TypeError}
 */
module.exports.asyncFilterIterable = async function asyncFilterIterable(
	iterable,
	callback,
	thisArg = undefined
) {
	validateIsIterable(iterable);

	return asyncFilter.call(iterable, callback, thisArg);
};
