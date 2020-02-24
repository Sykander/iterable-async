const { expect } = require('./support/chai'),
	AsyncArray = require('../src');

context('Async Array', () => {
	describe('Class attributes and properties', () => {
		it('Should inherit from Array', () =>
			expect(AsyncArray.prototype).to.be.instanceOf(Array));
	});

	describe('Class prototypical methods', () => {
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

		it('Should have access to the asyncReduce method', () =>
			expect(AsyncArray.prototype.asyncReduce).to.be.a('function'));
	});

	describe('Class static methods', () => {
		it('Should have access to the static asyncFilter method', () =>
			expect(AsyncArray.asyncFilter).to.be.a('function'));

		it('Should have access to the static asyncFind method', () =>
			expect(AsyncArray.asyncFind).to.be.a('function'));

		it('Should have access to the static asyncFindIndex method', () =>
			expect(AsyncArray.asyncFindIndex).to.be.a('function'));

		it('Should have access to the static asyncMap method', () =>
			expect(AsyncArray.asyncMap).to.be.a('function'));

		it('Should have access to the static asyncSort method', () =>
			expect(AsyncArray.asyncSort).to.be.a('function'));
	});
});
