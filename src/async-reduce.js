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
 * @param {any[]} iterable
 * @param {Function} callback - callback(currentValue, index, array)
 * @param {any} [accumulator=noParam]
 * @return {Promise<any>}
 * @throws {TypeError}
 */
async function asyncReduce(iterable, transducer, accumulator = noParam) {
	validateIsIterable(iterable);
	validateIsFunction(transducer);
	const length = iterable.length;
	let i = 0;

	if (accumulator === noParam) {
		try {
			validateNonZeroLength(iterable);
		} catch (e) {
			throw new TypeError(
				'asyncReduce of empty array with no accumulator given'
			);
		}

		accumulator = iterable[0];
		i = 1;
	}

	for (; i < length; i++) {
		// eslint-disable-next-line no-await-in-loop
		accumulator = await transducer(accumulator, iterable[i], i, iterable);
	}

	return accumulator;
}

module.exports = { asyncReduce };
