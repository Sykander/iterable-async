const { expect } = require('./support/chai'),
	moduleImport = require('..');

context('Iterable Async module', () => {
	describe('Module properties', () => {
		it('Should have the asyncFilter function', () => {
			expect(moduleImport.asyncFilter).to.be.a('function');
		});

		it('Should have the asyncFindIndex function', () => {
			expect(moduleImport.asyncFindIndex).to.be.a('function');
		});

		it('Should have the asyncFind function', () => {
			expect(moduleImport.asyncFind).to.be.a('function');
		});

		it('Should have the asyncForEach function', () => {
			expect(moduleImport.asyncForEach).to.be.a('function');
		});

		it('Should have the asyncMapSort function', () => {
			expect(moduleImport.asyncMapSort).to.be.a('function');
		});

		it('Should have the asyncMap function', () => {
			expect(moduleImport.asyncMap).to.be.a('function');
		});

		it('Should have the asyncReduce function', () => {
			expect(moduleImport.asyncReduce).to.be.a('function');
		});

		it('Should have the asyncSort function', () => {
			expect(moduleImport.asyncSort).to.be.a('function');
		});
	});
});
