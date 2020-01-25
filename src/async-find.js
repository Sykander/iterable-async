const { mapIterable } = require('./helpers'),
	{ validateIsIterable, validateIsFunction } = require('./validation');

/**
 * Async Find
 * ==========
 * Find an item in an iterable object asynchronously and resolve when found or all callbacks resolve
 * @async
 * @param {Function} callback - callback(currentValue, index, array)
 * @param {Object} [thisArg=undefined]
 * @return {any}
 * @throws {TypeError}
 */
module.exports = async function asyncFind(callback, thisArg = undefined) {
	validateIsIterable(this);
	validateIsFunction(callback);

	const tasks = mapIterable(this, callback.bind(thisArg), {
		useEmptyElements: true,
		newlyAddedElements: false
	});

	return this[
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
};
