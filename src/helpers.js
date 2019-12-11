/**
 * Map Iterable
 * ==============
 * Allows any iterable object to be mapped with correct callback parameters
 * eg. callback(currentValue, index, sourceIterable)
 * @param {Object} collection
 * @param {Function} callback
 * @return {Array}
 */
module.exports.mapIterable = function mapIterable(collection, callback) {
	const tasks = [];

	for (let currentValue of collection) {
		tasks.push(callback(currentValue, tasks.length, collection));
	}

	return tasks;
};
