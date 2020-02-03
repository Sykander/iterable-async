const { mapIterable } = require('./helpers'),
	{ validateIsIterable, validateIsFunction } = require('./validation');

/**
 * Async Find Index
 * ================
 * Find an item's index asynchronously and resolve when found or all callbacks resolve
 * @async
 * @param {Function} callback - callback(currentValue, index, array)
 * @param {Object} [thisArg=undefined]
 * @return {Number} - an integer index, -1 if not found
 * @throws {TypeError}
 */
const asyncFindIndex = (module.exports.asyncFindIndex = async function asyncFindIndex(
	callback,
	thisArg = undefined
) {
	validateIsFunction(callback);

	const tasks = mapIterable(this, callback.bind(thisArg), {
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
});

/**
 * Async Find Index On Iterable
 * ============================
 * Find an item's index in an iterable object asynchronously and resolve when found or all callbacks resolve
 * @async
 * @param {Object} iterable
 * @param {Function} callback - callback(currentValue, index, array)
 * @param {Object} [thisArg=undefined]
 * @return {Number} - an integer index, -1 if not found
 * @throws {TypeError}
 */
module.exports.asyncFindIndexOnIterable = async function asyncFindIndexOnIterable(
	iterable,
	callback,
	thisArg = undefined
) {
	validateIsIterable(iterable);

	return asyncFindIndex.call(iterable, callback, thisArg);
};
