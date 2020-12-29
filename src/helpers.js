/**
 * Map Iterable
 * ==============
 * Allows any iterable object to be mapped with correct callback parameters
 * eg. callback(currentValue, index, sourceIterable)
 * @ignore
 * @param {any[]} iterable
 * @param {Function} callback
 * @param {Object} [options]
 * @param {Boolean} [options.useEmptyElements=true] - use empty elements of the array ?
 * @return {any[]}
 */
function mapIterable(iterable, callback, { useEmptyElements = true } = {}) {
	const tasks = [],
		length = iterable.length;

	for (let index = 0; index < length; index++) {
		if (!useEmptyElements && !(index in iterable)) {
			continue;
		}

		tasks.push(callback(iterable[index], index, iterable));
	}

	return tasks;
}

/**
 * Filter Iterable
 * ===============
 * Allows any iterable object to be filtered using an array as a check list
 * @ignore
 * @param {any[]} iterable
 * @param {any[]} checks
 * @return {any[]}
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
 * @ignore
 * @param {any[]} items
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
 * @ignore
 * @async
 * @param {any[]} items
 * @param {Number} leftIndex
 * @param {Number} rightIndex
 * @param {Function} compare
 * @return {Promise<Number>} leftIndex after partition
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
 * @ignore
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
