const { mapIterable } = require('./helpers'),
	{ validateIsIterable, validateIsFunction } = require('./validation');

/**
 * Async For Each
 * ==============
 * Loop over an iterable object asynchronously and resolve when all callbacks are resolved
 * @async
 * @param {Function} callback - callback(currentValue, index, array)
 * @param {Object} [thisArg=undefined]
 * @throws {TypeError}
 */
module.exports = async function asyncForEach(callback, thisArg = undefined) {
	validateIsIterable(this);
	validateIsFunction(callback);

	await Promise.all(
		mapIterable(this, callback.bind(thisArg), {
			useEmptyElements: false,
			newlyAddedElements: false
		})
	);
};
