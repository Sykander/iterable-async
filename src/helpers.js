/**
 * Is iterable?
 * @param {any} item
 * @return {Boolean}
 */
module.exports.isIterable = function isIterable(item) {
	return Boolean(typeof item === 'object' && item && item[Symbol.iterator]);
};

/**
 * Get Iterator
 * @param {Object} collection
 * @return {Object} Array Iterator
 */
const getIterator = (module.exports.getIterator = function getIterator(
	collection
) {
	return collection[Symbol.iterator].call(collection);
});

/**
 * Map Collection
 * @param {Object} collection
 * @param {Function} callback
 * @return {Array}
 */
module.exports.mapCollection = function mapCollection(collection, callback) {
	const iterator = getIterator(collection),
		tasks = [];

	let { done, value } = iterator.next();

	while (!done) {
		tasks.push(callback(value, tasks.length, collection)),
			({ done, value } = iterator.next());
	}

	return tasks;
};
