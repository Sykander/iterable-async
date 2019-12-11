/**
 * Validate an item's iterability
 * @param {any} item
 * @throws {TypeError}
 */
module.exports.validateIsIterable = function validateIsIterable(item) {
	if (typeof item !== 'object' || !item || !item[Symbol.iterator]) {
		throw TypeError(`${item} is not iterable`);
	}
};

/**
 * Validate an item is a function
 * @param {any} item
 * @throws {TypeError}
 */
module.exports.validateIsFunction = function validateIsFunction(item) {
	if (typeof item !== 'function') {
		throw TypeError(`${item} is not a function`);
	}
};
