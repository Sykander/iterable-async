const { mapIterable, filterIterable } = require('./helpers'),
	{ noParam } = require('./constants'),
	{ validateIsIterable, validateIsFunction } = require('./validation');

/**
 * Async Filter
 * ============
 * Filter an iterable object asynchronously and resolve when all callbacks are resolved
 * @async
 * @param {Function} callback - callback(currentValue, index, array)
 * @param {Object} [thisArg] - must be iterable
 * @return {Array}
 * @throws {TypeError}
 */
module.exports = async function asyncFilter(callback, thisArg = noParam) {
	const collection = thisArg !== noParam ? thisArg : this;

	validateIsFunction(callback);
	validateIsIterable(collection);

	return filterIterable(
		collection,
		await Promise.all(mapIterable(collection, callback))
	);
};
