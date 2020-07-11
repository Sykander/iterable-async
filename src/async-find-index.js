const { mapIterable } = require('./helpers'),
	{ validateIsIterable, validateIsFunction } = require('./validation');

/**
 * Async Find Index
 * ================
 * Find an item's index asynchronously and resolve when found or all callbacks resolve
 * @async
 * @param {Object} iterable
 * @param {Function} callback - callback(currentValue, index, array)
 * @param {Object} [thisArg=undefined]
 * @return {Number} - an integer index, -1 if not found
 * @throws {TypeError}
 */
async function asyncFindIndex(iterable, callback, thisArg = undefined) {
	validateIsIterable(iterable);
	validateIsFunction(callback);

	const tasks = mapIterable(iterable, callback.bind(thisArg), {
		useEmptyElements: true,
		newlyAddedElements: false
	});

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
}

module.exports = { asyncFindIndex };
