const { getString } = require('./data-factory');

/**
 * Get callback and result
 * @param {Object} [options]
 * @param {Boolean} [options.isFind=false]
 * @param {Number} [options.findIndex=0]
 * @param {Boolean} [options.isSort=false]
 * @param {Function} [options.sortRule=()=>0]
 * @param {Boolean} [options.isAsync=false]
 * @param {Boolean} [options.isError=false]
 * @param {Boolean} [options.isReduce=false]
 * @return {Object} { result, callback, meta }
 */
function getCallback(options = {}) {
	const {
			isFind = false,
			findIndex = 0,
			isSort = false,
			sortRule = () => 0,
			isAsync = false,
			isError = false,
			isReduce = false
		} = options,
		result = [],
		meta = { options };

	let callback = function(item, index, array) {
		let callbackResult = item;

		if (isFind) {
			callbackResult = index === findIndex;
		}

		result.push({
			item,
			index,
			array,
			options,
			thisArg: this,
			result: callbackResult
		});

		return callbackResult;
	};

	if (isSort) {
		callback = function(firstEl, secondEl) {
			const sortResult = sortRule(firstEl, secondEl);

			result.push({
				firstEl,
				secondEl,
				options,
				thisArg: this,
				result: sortResult
			});

			return sortResult;
		};
	}

	if (isReduce) {
		callback = function(accumulator, item, index, array) {
			if (Array.isArray(accumulator)) {
				accumulator.push({
					item,
					index,
					array
				});
			}

			result.push({
				accumulator,
				item,
				index,
				array,
				thisArg: this,
				result: accumulator
			});

			return accumulator;
		};
	}

	if (isError) {
		const string = getString(),
			error = new Error(string);

		callback = function() {
			throw error;
		};

		meta.errorString = string;
		meta.error = error;
	}

	if (isAsync) {
		const innerCallback = callback;

		callback = async function(...args) {
			return innerCallback.call(this, ...args);
		};
	}

	return {
		result,
		callback,
		meta
	};
}

module.exports = { getCallback };
