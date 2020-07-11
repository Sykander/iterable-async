/**
 * Map Iterable
 * ==============
 * Allows any iterable object to be mapped with correct callback parameters
 * eg. callback(currentValue, index, sourceIterable)
 * @param {Object} iterable
 * @param {Function} callback
 * @param {Object} [options]
 * @param {Boolean} [options.useEmptyElements=true] - use empty elements of the array ?
 * @param {Boolean} [options.newlyAddedElements=false] - visit newly added elements ?
 * @return {Array}
 */
function mapIterable(
	iterable,
	callback,
	{ useEmptyElements = true, newlyAddedElements = false } = {}
) {
	const tasks = [];

	for (let index = 0, length = iterable.length; index < length; index++) {
		if (!useEmptyElements && !(index in iterable)) {
			continue;
		}

		tasks.push(callback(iterable[index], index, iterable));

		if (newlyAddedElements) {
			length = iterable.length;
		}
	}

	return tasks;
}

/**
 * Filter Iterable
 * ===============
 * Allows any iterable object to be filtered using an array as a check list
 * @param {Object} iterable
 * @param {Array} checks
 * @return {Array}
 */
function filterIterable(iterable, checks) {
	const result = [];
	let index = 0;

	for (let item of iterable) {
		if (checks[index++]) {
			result.push(item);
		}
	}

	return result;
}

/**
 * Swap items in array
 * @param {Object} items
 * @param {Number} leftIndex
 * @param {Number} rightIndex
 */
function swapItems(items, leftIndex, rightIndex) {
	const leftItem = items[leftIndex];
	items[leftIndex] = items[rightIndex];
	items[rightIndex] = leftItem;
}

/**
 * Async partition an array for quick sort
 * @async
 * @param {Object} items
 * @param {Number} leftIndex
 * @param {Number} rightIndex
 * @param {Function} compare
 * @return {Number} leftIndex after partition
 */
async function asyncPartition(items, leftIndex, rightIndex, compare) {
	const pivot = items[Math.floor((leftIndex + rightIndex) / 2)];

	while (leftIndex <= rightIndex) {
		// eslint-disable-next-line no-await-in-loop
		while ((await compare(items[leftIndex], pivot)) < 0) {
			leftIndex++;
		}

		// eslint-disable-next-line no-await-in-loop
		while ((await compare(items[rightIndex], pivot)) > 0) {
			rightIndex--;
		}

		if (leftIndex <= rightIndex) {
			swapItems(items, leftIndex++, rightIndex--);
		}
	}

	return leftIndex;
}

/**
 * Compares two items by unicode
 * @param {any} a
 * @param {any} b
 * @return {Number} -1, 0, 1
 */
const compareByUnicode = (a, b) => String(a).localeCompare(String(b));

module.exports = {
	mapIterable,
	filterIterable,
	swapItems,
	asyncPartition,
	compareByUnicode
};
