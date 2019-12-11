const { expect } = require('./chai');

/**
 * Expect promise to reject with error
 * @param {Promise} promise
 * @param {Error} error
 */
module.exports.rejectsWithError = function rejectsWithError(promise, error) {
	return expect(promise).to.rejectedWith(error.message);
};

/**
 * Expect callbacks to have been run in order
 * @param {Array} result
 */
module.exports.ranCallbacksInOrder = function ranCallbacksInOrder(result) {
	return result.every(({ index: expectedIndex }, actualIndex) =>
		expect(actualIndex).to.equal(expectedIndex)
	);
};

/**
 * Expects callback results to have had access to correct params from source array
 * @param {Object} source
 * @param {Array} result
 */
module.exports.hasAccessToCorrectArgumentsOnCallback = function hasAccessToCorrectArgumentsOnCallback(
	source,
	result
) {
	return result.every(
		(
			{ item: actualItem, array: actualArray, index: actualIndex },
			index
		) => {
			expect(actualItem).to.equal(source[index]);
			expect(actualIndex).to.equal(index);
			expect(actualArray).to.equal(source);

			// no further tests on this item
			return true;
		}
	);
};
