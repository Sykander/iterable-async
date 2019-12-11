const { getString } = require('./data-factory');

/**
 * Get Sync callback and result
 * @return {Object}
 */
module.exports.getSyncCallback = function getSyncCallback() {
	const result = [];

	return {
		result,
		callback: (item, index, array) => {
			result.push({
				item,
				index,
				array
			});

			return item;
		}
	};
};

/**
 * Get Async callback and result
 * @return {Object}
 */
module.exports.getAsyncCallback = function getAsyncCallback() {
	const result = [];

	return {
		result,
		callback: async (item, index, array) => {
			result.push({
				item,
				index,
				array
			});

			return item;
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
