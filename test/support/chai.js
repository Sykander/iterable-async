const chai = require('chai'),
	chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

/**
 * Chai with additional configuration
 * @type {chai} chai
 */
module.exports = chai;
