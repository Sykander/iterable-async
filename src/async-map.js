/**
 * Async Map
 * Map an array asynchronously and resolve when all callbacks are resolved
 * Will map independently from order when callbacks are async
 * @async
 * @param {Function} callback - callback(currentValue, index, array)
 * @param {Object} [thisArg=this] - must be iterable
 * @return {Array}
 * @throws {TypeError}
 */
module.exports = async function asyncMap(callback, thisArg = this) {
	if (typeof thisArg !== 'object') {
		throw TypeError(`${thisArg} is not an object`);
	}

	if (!thisArg) {
		throw TypeError(`${thisArg} is not iterable`);
	}

	const iterator = thisArg[Symbol.iterator];

	if (!iterator) {
		throw TypeError(`${thisArg} is not iterable`);
	}

	if (typeof callback !== 'function') {
		throw TypeError(`${callback} is not a function`);
	}

	const promises = [],
		iterable = iterator.call(thisArg);

	let { done, value } = iterable.next(),
		index = 0;

	while (!done) {
		promises.push(callback(value, index++, thisArg)),
			({ done, value } = iterable.next());
	}

	return await Promise.all(promises);
};
