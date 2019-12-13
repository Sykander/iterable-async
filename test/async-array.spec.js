const { expect } = require('./support/chai'),
	{ AsyncArray } = require('../src');

context('Async Array', () => {
	describe('Class attributes and properties', () => {
		it('Should inherit from Array', () =>
			expect(AsyncArray.prototype).to.be.instanceOf(Array));

		it('Should have access asyncFilter method', () =>
			expect(AsyncArray.prototype.asyncFilter).to.be.a('function'));

		it('Should have access asyncFind method', () =>
			expect(AsyncArray.prototype.asyncFind).to.be.a('function'));

		it('Should have access asyncFindIndex method', () =>
			expect(AsyncArray.prototype.asyncFindIndex).to.be.a('function'));

		it('Should have access asyncMap method', () =>
			expect(AsyncArray.prototype.asyncMap).to.be.a('function'));
	});
});
