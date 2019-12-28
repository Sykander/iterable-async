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
 * @return {Object} { result, callback, meta }
 */
module.exports.getCallback = function getCallback(options = {}) {
	const {
			isFind = false,
			findIndex = 0,
			isSort = false,
			sortRule = () => 0,
			isAsync = false,
			isError = false
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
};
