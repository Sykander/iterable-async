const faker = require('faker');

/**
 * Get a random integer in the range {x in Z; min <= x < max}
 * @param {Object} [options]
 * @param {Number} [options.min=-1000]
 * @param {Number} [options.max=1000]
 * @return {Number}
 */
const getInt = (module.exports.getInt = function getInt({
	min = -1000,
	max = 1000
} = {}) {
	return min + Math.floor(Math.random() * (max - min));
});

/**
 * Get a randomly sized array of random element
 * @param {Object} [options]
 * @param {Number} [options.length] - random size if none provided
 * @return {any[]}
 */
module.exports.getArray = function({ length = getInt({ min: 0 }) } = {}) {
	const arr = [];

	for (let i = 0; i < length; i++) {
		arr.push(faker.random.arrayElement());
	}

	return arr;
};

/**
 * Get a random string
 * @return {String}
 */
module.exports.getString = function getString() {
	return faker.lorem.words();
};
