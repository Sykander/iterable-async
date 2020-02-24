/**
 * Async Reduce
 * ============
 * Reduce asynchronously and resolve when
 * all items have been transduced.
 * @async
 * @param {Function} callback - callback(currentValue, index, array)
 * @param {any} [accumulator]
 * @return {any}
 * @throws {TypeError}
 */
const asyncReduce = (module.exports.asyncReduce = async function asyncReduce() {});

/**
 * Async Reduce
 * ============
 * Reduce an iterable object asynchronously and
 * resolve when all items have been transduced.
 * @async
 * @param {Object} iterable
 * @param {Function} callback - callback(currentValue, index, array)
 * @param {any} [accumulator]
 * @return {any}
 * @throws {TypeError}
 */
module.exports.asyncReduceIterable = async function asyncReduceIterable(
	iterable,
	callback,
	accumulator
) {
	return asyncReduce.call(iterable, callback, accumulator);
};
