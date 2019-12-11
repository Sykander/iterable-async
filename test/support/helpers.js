const { getString } = require('./data-factory');

/**
 * Get Sync callback and result
 * @param {Object} [options]
 * @param {Boolean} [options.isFind=false]
 * @param {Number} [options.findIndex=0]
 * @return {Object}
 */
module.exports.getSyncCallback = function getSyncCallback(options = {}) {
	const result = [],
		{ isFind = false, findIndex = 0 } = options;

	return {
		result,
		callback: (item, index, array) => {
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
		}
	};
};

/**
 * Get Async callback and result
 * @param {Boolean} [options.isFind=false]
 * @param {Number} [options.findIndex=0]
 * @return {Object}
 */
module.exports.getAsyncCallback = function getAsyncCallback(options = {}) {
	const result = [],
		{ isFind = false, findIndex = 0 } = options;

	return {
		result,
		callback: async (item, index, array) => {
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
		}
	};
};

/**
 * Get callback that throws error
 * @return {Object}
 */
module.exports.getErrorCallback = function getErrorCallback() {
	const string = getString(),
		error = new Error(string);

	return {
		string,
		error,
		callback: () => {
			throw error;
		}
	};
};
