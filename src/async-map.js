const { mapIterable } = require('./helpers'),
	{ validateIsIterable, validateIsFunction } = require('./validation');

/**
 * Async Map
 * =========
 * Map asynchronously and resolve when all callbacks are resolved
 * @async
 * @param {Function} callback - callback(currentValue, index, array)
 * @param {Object} [thisArg=undefined]
 * @return {Array}
 * @throws {TypeError}
 */
const asyncMap = (module.exports.asyncMap = async function asyncMap(
	callback,
	thisArg = undefined
) {
	validateIsFunction(callback);

	return Promise.all(
		mapIterable(this, callback.bind(thisArg), {
			useEmptyElements: false
		})
	);
});

/**
 * Async Map Over Iterable
 * =======================
 * Map over an iterable object asynchronously and resolve when all callbacks are resolved
 * @async
 * @param {Object} iterable
 * @param {Function} callback - callback(currentValue, index, array)
 * @param {Object} [thisArg=undefined]
 * @return {Array}
 * @throws {TypeError}
 */
module.exports.asyncMapOverIterable = async function asyncMapOverIterable(
	iterable,
	callback,
	thisArg = undefined
) {
	validateIsIterable(iterable);

	return asyncMap.call(iterable, callback, thisArg);
};
