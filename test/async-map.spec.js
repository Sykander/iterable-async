const { expect } = require('./support/chai'),
	{ getArray } = require('./support/data-factory'),
	{
		getSyncCallback,
		getAsyncCallback,
		getErrorCallback
	} = require('./support/helpers'),
	asyncMapFunction = require('../src/async-map');

context('Async Map', function() {
	let array, asyncMap;

	beforeEach(() => {
		(array = getArray()), (asyncMap = asyncMapFunction.bind(array));
	});

	describe('Given no arguments', function() {
		it('Should reject with "TypeError: undefined is not a function"', async function() {
			await expect(asyncMap()).to.rejectedWith(
				'undefined is not a function'
			);
		});
	});

	describe('Given a synchronous callback', function() {
		let result, callback, mappedArray;

		beforeEach(async () => {
			({ result, callback } = getSyncCallback());

			mappedArray = await asyncMap(callback);
		});

		it('Should run each callback in order', async function() {
			result.every(({ index: expectedIndex }, actualIndex) =>
				expect(actualIndex).to.equal(expectedIndex)
			);
		});

		it('Should map each item in order', async function() {
			mappedArray.every((item, index) =>
				expect(item).to.equal(array[index])
			);
		});

		it('Should resolve to a new array', async function() {
			expect(mappedArray).to.not.equal(array);
		});
	});

	describe('Given a sychronous callback and array', function() {
		let result, callback, mappedArray;

		beforeEach(async () => {
			({ result, callback } = getSyncCallback());

			mappedArray = await asyncMap(callback, array);
		});

		it('Should map each item in order', async function() {
			mappedArray.every((item, index) =>
				expect(item).to.equal(array[index])
			);
		});

		it('Should run each callback in order', async function() {
			result.every(({ index: expectedIndex }, actualIndex) =>
				expect(actualIndex).to.equal(expectedIndex)
			);
		});

		it('Should resolve to a new array', async function() {
			expect(mappedArray).to.not.equal(array);
		});
	});

	describe('Given an async callback', function() {
		let result, callback, mappedArray;

		beforeEach(async () => {
			({ result, callback } = getAsyncCallback());

			mappedArray = await asyncMap(callback, array);
		});

		it('Should map each item in order', async function() {
			mappedArray.every((item, index) =>
				expect(item).to.equal(array[index])
			);
		});

		it('Should run each callback in order', async function() {
			result.every(({ index: expectedIndex }, actualIndex) =>
				expect(actualIndex).to.equal(expectedIndex)
			);
		});

		it('Should resolve to a new array', async function() {
			expect(mappedArray).to.not.equal(array);
		});
	});

	describe('Given an async callback and array', function() {
		let result, callback, mappedArray;

		beforeEach(async () => {
			({ result, callback } = getAsyncCallback());

			mappedArray = await asyncMap(callback, array);
		});

		it('Should map each item in order', async function() {
			mappedArray.every((item, index) =>
				expect(item).to.equal(array[index])
			);
		});

		it('Should run each callback in order', async function() {
			result.every(({ index: expectedIndex }, actualIndex) =>
				expect(actualIndex).to.equal(expectedIndex)
			);
		});

		it('Should resolve to a new array', async function() {
			expect(mappedArray).to.not.equal(array);
		});
	});

	describe('Given a callback that throws an error', function() {
		const { callback, string } = getErrorCallback();

		it('Should reject with that error', async function() {
			await expect(asyncMap(callback)).to.rejectedWith(string);
		});
	});

	describe('Given a callback that throws an error and an array', function() {
		const { callback, string } = getErrorCallback();

		it('Should reject with that error', async function() {
			await expect(asyncMap(callback, array)).to.rejectedWith(string);
		});
	});

	describe('Given a callback that uses additional parameters', function() {
		let result, callback;

		beforeEach(async () => {
			({ result, callback } = getSyncCallback());

			await asyncMap(callback);
		});

		it('Should have the correct element', async function() {
			return array.every((item, index) =>
				expect(item).to.equal(result[index].item)
			);
		});

		it('Should have correct index for each callback', async function() {
			return array.every((item, index) =>
				expect(index).to.equal(result[index].index)
			);
		});

		it('Should have access to the source array', async function() {
			return array.every((item, index) =>
				expect(array).to.equal(result[index].array)
			);
		});
	});
});
