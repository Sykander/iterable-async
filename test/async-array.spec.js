const { expect } = require('./support/chai'),
	{ AsyncArray } = require('../src');

context('Async Array', () => {
	describe('Class attributes and properties', () => {
		it('Should inherit from Array', () =>
			expect(AsyncArray.prototype).to.be.instanceOf(Array));

		it('Should have access to the asyncFilter method', () =>
			expect(AsyncArray.prototype.asyncFilter).to.be.a('function'));

		it('Should have access to the asyncFind method', () =>
			expect(AsyncArray.prototype.asyncFind).to.be.a('function'));

		it('Should have access to the asyncFindIndex method', () =>
			expect(AsyncArray.prototype.asyncFindIndex).to.be.a('function'));

		it('Should have access to the asyncMap method', () =>
			expect(AsyncArray.prototype.asyncMap).to.be.a('function'));

		it('Should have access to the asyncSort method', () =>
			expect(AsyncArray.prototype.asyncSort).to.be.a('function'));
	});
});
