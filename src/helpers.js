/**
 * Is iterable?
 * @param {any} item
 * @return {Boolean}
 */
module.exports.isIterable = function isIterable(item) {
	return Boolean(typeof item === 'object' && item && item[Symbol.iterator]);
};

/**
 * Map Collection
 * @param {Object} collection
 * @param {Function} callback
 * @return {Array}
 */
module.exports.mapCollection = function mapCollection(collection, callback) {
	const iterator = collection[Symbol.iterator](),
		tasks = [];

	let { done, value } = iterator.next();

	while (!done) {
		tasks.push(callback(value, tasks.length, collection)),
			({ done, value } = iterator.next());
	}

	return tasks;
};
