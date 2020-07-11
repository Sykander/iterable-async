const { expect } = require('./chai');

/**
 * Expect promise to reject with error
 * @param {Promise} promise
 * @param {Error} error
 */
function rejectsWithError(promise, error) {
	return expect(promise).to.rejectedWith(error.message);
}

/**
 * Expect callbacks to have been run in order
 * @param {Array} result
 * @param {Object} [options={}]
 * @param {Boolean} [options.skipFirst=false]
 */
function ranCallbacksInOrder(result, { skipFirst = false } = {}) {
	return result.every(({ index: expectedIndex }, actualIndex) =>
		expect(actualIndex + (skipFirst ? 1 : 0)).to.equal(expectedIndex)
	);
}

/**
 * Expects callback results to have had access to correct params from source array
 * @param {Object} source
 * @param {Array} results
 * @param {String[]} params
 * @param {Object} [options={}]
 * @param {Boolean} [options.skipFirst=false]
 */
function hasAccessToCorrectArgumentsOnCallback(
	source,
	results,
	params,
	{ skipFirst = false } = {}
) {
	if (params.includes('currentValue')) {
		params[params.indexOf('currentValue')] = 'item';
	}

	return results.every((result, index) => {
		if (params.includes('item')) {
			expect(result.item).to.equal(source[result.index]);
		}

		if (params.includes('accumulator')) {
			expect(result.accumulator).to.not.be.undefined;
		}

		if (params.includes('index')) {
			expect(result.index).to.equal(index + (skipFirst ? 1 : 0));
		}

		if (params.includes('array')) {
			expect(result.array).to.equal(source);
		}

		const hasProperties = params.every(param =>
			expect(result).to.haveOwnProperty(param)
		);

		return expect(hasProperties).to.be.true;
	});
}

module.exports = {
	ranCallbacksInOrder,
	hasAccessToCorrectArgumentsOnCallback,
	rejectsWithError
};
