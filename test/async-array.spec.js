const { expect } = require('./support/chai'),
	{ AsyncArray } = require('../src');

context('Async Array', () => {
	describe('Class attributes and properties', () => {
		let asyncArray;

		beforeEach(() => (asyncArray = new AsyncArray()));

		it('Should inherit from Array', () =>
			expect(asyncArray).to.be.instanceOf(Array));

		it('Should have access asyncFilter method', () =>
			expect(asyncArray.asyncFilter).to.be.a('function'));

		it('Should have access asyncFind method', () =>
			expect(asyncArray.asyncFind).to.be.a('function'));

		it('Should have access asyncFindIndex method', () =>
			expect(asyncArray.asyncFindIndex).to.be.a('function'));

		it('Should have access asyncMap method', () =>
			expect(asyncArray.asyncMap).to.be.a('function'));
	});
});
