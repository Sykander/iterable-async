const asyncMap = require('./async-map');

/**
 * Async For Each
 * Loop over an array asynchronously and resolve when all callbacks are resolved
 * Will loop independently from order when callbacks are async
 * @async
 * @param {Function} callback - callback(currentValue, index, array)
 * @param {Object} [thisArg=this] - must be iterable
 * @return {Array}
 * @throws {TypeError}
 */
module.exports = async function asyncForEach(callback, thisArg = this) {
	await asyncMap.call(this, callback, thisArg);
};
