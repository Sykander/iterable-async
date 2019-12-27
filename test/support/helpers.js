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
const getCallback = (module.exports.getCallback = function getCallback(
	options = {}
) {
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

	let callback = (item, index, array) => {
		let callbackResult = item;

		if (isFind) {
			callbackResult = index === findIndex;
		}

		result.push({
			item,
			index,
			array,
			options,
			result: callbackResult
		});

		return callbackResult;
	};

	if (isSort) {
		callback = (firstEl, secondEl) => {
			const sortResult = sortRule(firstEl, secondEl);

			result.push({
				firstEl,
				secondEl,
				options,
				result: sortResult
			});

			return sortResult;
		};
	}

	if (isError) {
		const string = getString(),
			error = new Error(string);

		callback = () => {
			throw error;
		};

		meta.errorString = string;
		meta.error = error;
	}

	if (isAsync) {
		const innerCallback = callback;

		callback = async (...args) => innerCallback(...args);
	}

	return {
		result,
		callback,
		meta
	};
});

/**
 * Get Sync callback and result
 * @param {Object} [options]
 * @param {Boolean} [options.isFind=false]
 * @param {Number} [options.findIndex=0]
 * @param {Boolean} [options.isSort=false]
 * @param {Function} [options.sortRule=()=>0]
 * @param {Boolean} [options.isAsync=false]
 * @param {Boolean} [options.isError=false]
 * @return {Object} { result, callback, meta }
 */
module.exports.getSyncCallback = getCallback;

/**
 * Get Async callback and result
 * @param {Object} [options]
 * @param {Boolean} [options.isFind=false]
 * @param {Number} [options.findIndex=0]
 * @param {Boolean} [options.isSort=false]
 * @param {Function} [options.sortRule=()=>0]
 * @param {Boolean} [options.isAsync=true]
 * @param {Boolean} [options.isError=false]
 * @return {Object} { result, callback, meta }
 */
module.exports.getAsyncCallback = (options = {}) =>
	getCallback(Object.assign({ isAsync: true }, options));

/**
 * Get Error callback and result
 * @param {Object} [options]
 * @param {Boolean} [options.isFind=false]
 * @param {Number} [options.findIndex=0]
 * @param {Boolean} [options.isSort=false]
 * @param {Function} [options.sortRule=()=>0]
 * @param {Boolean} [options.isAsync=false]
 * @param {Boolean} [options.isError=true]
 * @return {Object} { result, callback, meta }
 */
module.exports.getErrorCallback = (options = {}) =>
	getCallback(Object.assign({ isError: true }, options));
