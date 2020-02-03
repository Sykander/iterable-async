const { expect } = require('./support/chai'),
	{ getArray } = require('./support/data-factory'),
	{ getCallback } = require('./support/helpers'),
	{ rejectsWithError } = require('./support/spec-helpers'),
	{ asyncSort } = require('../src');

context('Async Sort', () => {
	let array;

	beforeEach(() => {
		array = getArray();
	});

	describe('Given the array parameter', () => {
		let sortedArray;

		beforeEach(async () => {
			sortedArray = await asyncSort(array);
		});

		it('Should sort elements by unicode value', () => {
			const expectedResult = array.slice().sort();

			expectedResult.every((item, index) =>
				expect(item).to.equal(sortedArray[index])
			);
		});
	});

	describe('Given a synchronous compareFunc', () => {
		let compareFunc, sortedArray;

		beforeEach(async () => {
			({ compareFunc } = getCallback({ isSort: true }));

			sortedArray = await asyncSort(array, compareFunc);
		});

		it('Should sort each item by the compareFunc result', async () => {
			sortedArray.every((item, index) =>
				expect(item).to.equal(array[index])
			);
		});

		it('Should resolve to the same array', async () =>
			expect(sortedArray).to.equal(array));
	});

	describe('Given an asynchronous compareFunc', () => {
		let compareFunc, sortedArray;

		beforeEach(async () => {
			({ compareFunc } = getCallback({ isSort: true }));

			sortedArray = await asyncSort(array, compareFunc, array);
		});

		it('Should sort each item by the compareFunc result', async () => {
			sortedArray.every((item, index) =>
				expect(item).to.equal(array[index])
			);
		});

		it('Should resolve to the same array', async () =>
			expect(sortedArray).to.equal(array));
	});

	describe('Given a compareFunc that throws an error', () => {
		let compareFunc, error;

		beforeEach(
			() =>
				({
					callback: compareFunc,
					meta: { error }
				} = getCallback({ isError: true }))
		);

		it('Should reject with that error', async () =>
			rejectsWithError(asyncSort(array, compareFunc), error));
	});

	describe('Given a compareFunc that uses all arguments', () => {
		let compareFunc, result;

		beforeEach(async () => {
			({ result, compareFunc } = getCallback({ isSort: true }));

			await asyncSort(array, compareFunc);
		});

		it('Should have access to first and second elements', () =>
			result.every(({ firstEl, secondEl }) =>
				expect(array)
					.to.contain(firstEl)
					.and.contain(secondEl)
			));
	});
});
