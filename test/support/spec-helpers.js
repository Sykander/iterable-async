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
 * @param {Array} results
 * @param {String[]} params
 */
module.exports.hasAccessToCorrectArgumentsOnCallback = function hasAccessToCorrectArgumentsOnCallback(
	source,
	results,
	params
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
			expect(result.index).to.equal(index);
		}

		if (params.includes('array')) {
			expect(result.array).to.equal(source);
		}

		const hasProperties = params.every(param =>
			expect(result).to.haveOwnProperty(param)
		);

		return expect(hasProperties).to.be.true;
	});
};
