/**
 * Map Iterable
 * ==============
 * Allows any iterable object to be mapped with correct callback parameters
 * eg. callback(currentValue, index, sourceIterable)
 * @param {Object} iterable
 * @param {Function} callback
 * @return {Array}
 */
module.exports.mapIterable = function mapIterable(iterable, callback) {
	const tasks = [];

	for (let currentValue of iterable) {
		tasks.push(callback(currentValue, tasks.length, iterable));
	}

	return tasks;
};

/**
 * Filter Iterable
 * ===============
 * Allows any iterable object to be filtered using an array as a check list
 * @param {Object} iterable
 * @param {Array} checks
 * @return {Array}
 */
module.exports.filterIterable = function filterIterable(iterable, checks) {
	const result = [];
	let index = 0;

	for (let item of iterable) {
		if (checks[index++]) {
			result.push(item);
		}
	}

	return result;
};

/**
 * Swap items in array
 * @param {Object} items
 * @param {Number} leftIndex
 * @param {Number} rightIndex
 */
const swapItems = (module.exports.swapItems = function swapItems(
	items,
	leftIndex,
	rightIndex
) {
	const leftItem = items[leftIndex];
	items[leftIndex] = items[rightIndex];
	items[rightIndex] = leftItem;
});

/**
 * perform
 * @async
 * @param {Object} items
 * @param {Number} leftIndex
 * @param {Number} rightIndex
 * @param {Function} compare
 */
module.exports.asyncPartition = async function partition(
	items,
	leftIndex,
	rightIndex,
	compare
) {
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
};

/**
 * Compares two items by unicode
 * @param {any} a
 * @param {any} b
 * @return {Number} -1, 0, 1
 */
module.exports.compareByUnicode = (a, b) => {
	const strA = String(a),
		strB = String(b);

	if (strA === strB) {
		return 0;
	}

	let aCode, bCode;

	for (let i = 0; i < strA.length; i++) {
		aCode = strA.charCodeAt(i);
		bCode = strB.charCodeAt(i);

		if (aCode === bCode) {
			continue;
		}

		return isNaN(bCode) || aCode > bCode ? 1 : -1;
	}

	return strA.length < strB.length ? -1 : 1;
};
