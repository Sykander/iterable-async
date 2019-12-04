const { noParamPassed } = require('./constants');

/**
 * Async For Each
 * Iterates over an array asynchronously (independent of order)
 * Uses the built in map method of the passed array or of 'this' otherwise
 * @async
 * @param {Function} callback
 * @param {Array} [arr]
 * @throws {TypeError}
 */
module.exports = async function asyncForEach(callback, arr = noParamPassed) {
	if (arr !== noParamPassed && !Array.isArray(arr)) {
		throw TypeError(`${arr} is not an array`);
	}

	if (typeof callback !== 'function') {
		throw TypeError(`${callback} is not a function`);
	}

	const arrToUse = arr !== noParamPassed ? arr : this;

	await Promise.all(arrToUse.map(callback));
};
