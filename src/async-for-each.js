const { mapIterable } = require('./helpers'),
	{ noParam } = require('./constants'),
	{ validateIsIterable, validateIsFunction } = require('./validation');

/**
 * Async For Each
 * ==============
 * Loop over an iterable object asynchronously and resolve when all callbacks are resolved
 * @async
 * @param {Function} callback - callback(currentValue, index, array)
 * @param {Object} [thisArg]
 * @throws {TypeError}
 */
module.exports = async function asyncForEach(callback, thisArg = noParam) {
	validateIsIterable(this);
	validateIsFunction(callback);

	await Promise.all(
		mapIterable(
			this,
			callback.bind(thisArg !== noParam ? thisArg : undefined),
			{ useEmptyElements: false, newlyAddedElements: false }
		)
	);
};
