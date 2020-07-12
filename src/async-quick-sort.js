const { asyncPartition } = require('./helpers');

/**
 * Async Quick Sort
 * ================
 * Asynchronously sorts an iterable using quick-sort algorithm
 * @param {any[]} iterable
 * @param {Number} leftIndex
 * @param {Number} rightIndex
 * @param {Function} compareFunc
 */
async function asyncQuickSort(iterable, leftIndex, rightIndex, compareFunc) {
	let index;

	if (iterable.length > 1) {
		index = await asyncPartition(
			iterable,
			leftIndex,
			rightIndex,
			compareFunc
		);

		if (leftIndex < index - 1) {
			await asyncQuickSort(iterable, leftIndex, index - 1, compareFunc);
		}

		if (index < rightIndex) {
			await asyncQuickSort(iterable, index, rightIndex, compareFunc);
		}
	}

	return iterable;
}

module.exports = { asyncQuickSort };
