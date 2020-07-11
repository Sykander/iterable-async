/**
 * Validate an item's iterability
 * @param {any} item
 * @return {Boolean} validated?
 * @throws {TypeError}
 */
function validateIsIterable(item) {
	if (typeof item !== 'object' || !item || !item[Symbol.iterator]) {
		throw new TypeError(`${item} is not iterable`);
	}

	return true;
}

/**
 * Validate an item is a function
 * @param {any} item
 * @return {Boolean} validated?
 * @throws {TypeError}
 */
function validateIsFunction(item) {
	if (typeof item !== 'function') {
		throw new TypeError(`${item} is not a function`);
	}

	return true;
}

/**
 * Validate if an item has length greater than 0
 * @param {any} item
 * @return {Boolean} validated?
 * @throws {TypeError}
 */
function validateNonZeroLength(item) {
	if (!item || typeof item !== 'object' || !item.length) {
		throw new TypeError(`${item} has no iterable items`);
	}

	return true;
}

module.exports = {
	validateIsIterable,
	validateIsFunction,
	validateNonZeroLength
};
