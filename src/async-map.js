const { mapIterable } = require('./helpers'),
	{ validateIsIterable, validateIsFunction } = require('./validation');

/**
 * Async Map
 * =========
 * Map an iterable object asynchronously and resolve when all callbacks are resolved
 * @async
 * @param {Function} callback - callback(currentValue, index, array)
 * @param {Object} [thisArg=undefined]
 * @return {Array}
 * @throws {TypeError}
 */
module.exports = async function asyncMap(callback, thisArg = undefined) {
	validateIsIterable(this);
	validateIsFunction(callback);

	return Promise.all(
		mapIterable(this, callback.bind(thisArg), {
			useEmptyElements: false,
			newlyAddedElements: false
		})
	);
};
