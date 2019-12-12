const { mapIterable } = require('./helpers'),
	{ noParam } = require('./constants'),
	{ validateIsIterable, validateIsFunction } = require('./validation');

/**
 * Async Find Index
 * Find an item's index in an iterable object asynchronously and resolve when found or all callbacks resolve
 * @async
 * @param {Function} callback - callback(currentValue, index, array)
 * @param {Object} [thisArg] - must be iterable
 * @return {Number} - an integer index, -1 if not found
 * @throws {TypeError}
 */
module.exports = async function asyncFindIndex(callback, thisArg = noParam) {
	const collection = thisArg !== noParam ? thisArg : this;

	validateIsFunction(callback);
	validateIsIterable(collection);

	const tasks = mapIterable(collection, callback);

	return Promise.race([
		Promise.race(
			tasks.map(async (task, index) => {
				const checkIsFound = await task;

				return new Promise(resolve => checkIsFound && resolve(index));
			})
		),
		Promise.all(tasks).then(taskResults =>
			taskResults.findIndex(result => result)
		)
	]);
};
