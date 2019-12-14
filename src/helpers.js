/**
 * Map Iterable
 * ==============
 * Allows any iterable object to be mapped with correct callback parameters
 * eg. callback(currentValue, index, sourceIterable)
 * @param {Object} iterable
 * @param {Function} callback
 * @return {Array}
 */
module.exports.mapIterable = function mapIterable(iterable, callback) {
	const tasks = [];

	for (let currentValue of iterable) {
		tasks.push(callback(currentValue, tasks.length, iterable));
	}

	return tasks;
};

/**
 * Filter Iterable
 * ===============
 * Allows any iterable object to be filtered using an array as a check list
 * @param {Object} iterable
 * @param {Array} checks
 * @return {Array}
 */
module.exports.filterIterable = function filterIterable(iterable, checks) {
	const result = [];
	let index = 0;

	for (let item of iterable) {
		if (checks[index++]) {
			result.push(item);
		}
	}

	return result;
};
