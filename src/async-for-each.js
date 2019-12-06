const noParamPassed = require('./constants'),
	asyncMap = require('./async-map');

/**
 * Async For Each
 * Loop over an array asynchronously and resolve when all are resolved
 * Will loop independently from order when callbacks are async
 * @async
 * @param {Function} callback
 * @param {Object} [arr] - must be iterable
 * @return {Array}
 * @throws {TypeError}
 */
module.exports = async function asyncForEach(callback, arr = noParamPassed) {
	if (arr === noParamPassed) {
		await asyncMap.call(this, callback);
	} else {
		await asyncMap.call(this, callback, arr);
	}
};
