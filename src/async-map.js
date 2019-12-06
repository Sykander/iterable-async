const { noParamPassed } = require('./constants');

/**
 * Async Map
 * Map an array asynchronously and resolve when all are resolved
 * Will map independently from order when callbacks are async
 * @async
 * @param {Function} callback
 * @param {Object} [arr] - must be iterable
 * @return {Array}
 * @throws {TypeError}
 */
module.exports = async function asyncMap(callback, arr = noParamPassed) {
	if (arr === noParamPassed) {
		arr = this;
	}

	if (typeof arr !== 'object') {
		throw TypeError(`${arr} is not an object`);
	}

	if (!arr) {
		throw TypeError(`${arr} is not iterable`);
	}

	const iterator = arr[Symbol.iterator];

	if (!iterator) {
		throw TypeError(`${arr} is not iterable`);
	}

	if (typeof callback !== 'function') {
		throw TypeError(`${callback} is not a function`);
	}

	const promises = [],
		iterable = iterator.call(arr);

	let { done, value } = iterable.next(),
		index = 0;

	while (!done) {
		promises.push(callback(value, index++, arr));
		({ done, value } = iterable.next());
	}

	return await Promise.all(promises);
};
