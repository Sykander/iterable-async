const { mapIterable } = require('./helpers'),
	{ noParam } = require('./constants'),
	{ validateIsIterable, validateIsFunction } = require('./validation');

/**
 * Async Find Index
 * ================
 * Find an item's index in an iterable object asynchronously and resolve when found or all callbacks resolve
 * @async
 * @param {Function} callback - callback(currentValue, index, array)
 * @param {Object} [thisArg]
 * @return {Number} - an integer index, -1 if not found
 * @throws {TypeError}
 */
module.exports = async function asyncFindIndex(callback, thisArg = noParam) {
	validateIsIterable(this);
	validateIsFunction(callback);

	const tasks = mapIterable(
		this,
		callback.bind(thisArg !== noParam ? thisArg : undefined),
		{ useEmptyElements: true, newlyAddedElements: false }
	);

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
