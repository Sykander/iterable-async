const { mapIterable } = require('./helpers'),
	{ validateIsIterable, validateIsFunction } = require('./validation');

/**
 * Async For Each
 * ==============
 * Loop asynchronously and resolve when all callbacks are resolved
 * @async
 * @param {Function} callback - callback(currentValue, index, array)
 * @param {Object} [thisArg=undefined]
 * @throws {TypeError}
 */
const asyncForEach = (module.exports.asyncForEach = async function asyncForEach(
	callback,
	thisArg = undefined
) {
	validateIsFunction(callback);

	await Promise.all(
		mapIterable(this, callback.bind(thisArg), {
			useEmptyElements: false,
			newlyAddedElements: false
		})
	);
});

/**
 * Async For Each Of Iterable
 * ============================
 * Loop over an iterable object asynchronously and resolve when all callbacks are resolved
 * @async
 * @param {Object} iterable
 * @param {Function} callback - callback(currentValue, index, array)
 * @param {Object} [thisArg=undefined]
 * @throws {TypeError}
 */
module.exports.asyncForEachOfIterable = async function asyncForEachOfIterable(
	iterable,
	callback,
	thisArg = undefined
) {
	validateIsIterable(iterable);

	return asyncForEach.call(iterable, callback, thisArg);
};
