const { noParamPassed } = require('./constants');

/**
 * Async Map
 * Map an array asynchronously (independent of order)
 * Uses the built in map method of the passed array or of 'this' otherwise
 * @async
 * @param {Function} callback
 * @param {Array} [arr]
 * @return {Array}
 * @throws {TypeError}
 */
module.exports = async function asyncMap(callback, arr = noParamPassed) {
	if (arr !== noParamPassed && !Array.isArray(arr)) {
		throw TypeError(`${arr} is not an array`);
	}

	if (typeof callback !== 'function') {
		throw TypeError(`${callback} is not a function`);
	}

	return await Promise.all(
		(arr !== noParamPassed ? arr : this).map(callback)
	);
};
