const {
		validateIsIterable,
		validateIsFunction,
		validateNonZeroLength
	} = require('./validation'),
	{ noParam } = require('./constants');

/**
 * Async Reduce
 * ============
 * Reduce asynchronously and resolve when
 * all items have been transduced.
 * @async
 * @param {Function} callback - callback(currentValue, index, array)
 * @param {any} [accumulator=noParam]
 * @return {any}
 * @throws {TypeError}
 */
const asyncReduce = (module.exports.asyncReduce = async function asyncReduce(
	transducer,
	accumulator = noParam
) {
	validateIsFunction(transducer);
	const length = this.length;
	let i = 0;

	if (accumulator === noParam) {
		try {
			validateNonZeroLength(this);
		} catch (e) {
			throw new TypeError(
				'asyncReduce of empty array with no accumulator given'
			);
		}

		accumulator = this[0];
		i = 1;
	}

	for (; i < length; i++) {
		// eslint-disable-next-line no-await-in-loop
		accumulator = await transducer(accumulator, this[i], i, this);
	}

	return accumulator;
});

/**
 * Async Reduce
 * ============
 * Reduce an iterable object asynchronously and
 * resolve when all items have been transduced.
 * @async
 * @param {Object} iterable
 * @param {Function} callback - callback(currentValue, index, array)
 * @param {any} [accumulator=noParam]
 * @return {any}
 * @throws {TypeError}
 */
module.exports.asyncReduceIterable = async function asyncReduceIterable(
	iterable,
	callback,
	accumulator = noParam
) {
	validateIsIterable(iterable);

	return asyncReduce.call(iterable, callback, accumulator);
};
