const { mapIterable } = require('./helpers'),
	{ validateIsIterable, validateIsFunction } = require('./validation');

/**
 * Async Find
 * ==========
 * Find an item asynchronously and resolve when found or all callbacks resolve
 * @async
 * @param {Object} iterable
 * @param {Function} callback - callback(currentValue, index, array)
 * @param {Object} [thisArg=undefined]
 * @return {any}
 * @throws {TypeError}
 */
async function asyncFind(iterable, callback, thisArg = undefined) {
	validateIsIterable(iterable);
	validateIsFunction(callback);

	const tasks = mapIterable(iterable, callback.bind(thisArg), {
		useEmptyElements: true
	});

	return iterable[
		await Promise.race([
			Promise.race(
				tasks.map(async (task, index) => {
					const checkIsFound = await task;

					return new Promise(
						resolve => checkIsFound && resolve(index)
					);
				})
			),
			Promise.all(tasks).then(taskResults =>
				taskResults.findIndex(result => result)
			)
		])
	];
}

module.exports = { asyncFind };
