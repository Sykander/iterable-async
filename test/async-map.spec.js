const { expect } = require('./support/chai'),
	asyncMap = require('../src/async-map');

describe('Async Map', function() {
	context('Given no arguments', function() {
		it('Should reject with "TypeError: undefined is not a function"', async function() {
			await expect(asyncMap()).to.rejectedWith(
				'undefined is not a function'
			);
		});
	});
});
