const { mapIterable } = require('./helpers'),
	{ noParam } = require('./constants'),
	{ validateIsIterable, validateIsFunction } = require('./validation');

/**
 * Async For Each
 * Loop over an iterable object asynchronously and resolve when all callbacks are resolved
 * Will loop independently from order when callbacks are async
 * @async
 * @param {Function} callback - callback(currentValue, index, array)
 * @param {Object} [thisArg] - must be iterable
 * @return {Array}
 * @throws {TypeError}
 */
module.exports = async function asyncForEach(callback, thisArg = noParam) {
	const collection = thisArg !== noParam ? thisArg : this;

	validateIsFunction(callback);
	validateIsIterable(collection);

	await Promise.all(mapIterable(collection, callback));
};
