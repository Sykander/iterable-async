const { expect } = require('./support/chai'),
	{ getArray } = require('./support/data-factory'),
	{
		getSyncCallback,
		getAsyncCallback,
		getErrorCallback
	} = require('./support/helpers'),
	asyncForEachFunction = require('../src/async-for-each');

context('Async For Each', function() {
	let array, asyncForEach;

	beforeEach(() => {
		(array = getArray()), (asyncForEach = asyncForEachFunction.bind(array));
	});

	describe('Given no arguments', function() {
		it('Should reject with "TypeError: undefined is not a function"', async function() {
			await expect(asyncForEach()).to.rejectedWith(
				'undefined is not a function'
			);
		});
	});

	describe('Given a synchronous callback', function() {
		let result, callback;

		beforeEach(async () => {
			({ result, callback } = getSyncCallback());

			await asyncForEach(callback);
		});

		it('Should run each callback in order', async function() {
			result.every(({ index: expectedIndex }, actualIndex) =>
				expect(actualIndex).to.equal(expectedIndex)
			);
		});
	});

	describe('Given an asynchronous callback', function() {
		let result, callback;

		beforeEach(async () => {
			({ result, callback } = getAsyncCallback());

			await asyncForEach(callback);
		});

		it('Should run each callback in order', async function() {
			result.every(({ index: expectedIndex }, actualIndex) =>
				expect(actualIndex).to.equal(expectedIndex)
			);
		});
	});

	describe('Given a callback that throws an error', function() {
		let callback, string;

		beforeEach(() => ({ callback, string } = getErrorCallback()));

		it('Should reject with that error', async function() {
			await expect(asyncForEach(callback)).to.rejectedWith(string);
		});
	});

	describe('Given a callback that uses additional parameters', function() {
		let result, callback;

		beforeEach(async () => {
			({ result, callback } = getSyncCallback());

			await asyncForEach(callback);
		});

		it('Should have access to the correct element', async function() {
			return array.every((item, index) =>
				expect(item).to.equal(result[index].item)
			);
		});

		it('Should have the correct index for each callback', async function() {
			return array.every((item, index) =>
				expect(index).to.equal(result[index].index)
			);
		});

		it('Should have access to the source iterable object', async function() {
			return array.every((item, index) =>
				expect(array).to.equal(result[index].array)
			);
		});
	});

	describe('Given the optional thisArg parameter', function() {
		let result, callback, newArray;

		beforeEach(async () => {
			newArray = getArray();

			({ result, callback } = getSyncCallback());

			await asyncForEach(callback, newArray);
		});

		it('Should loop over the given thisArg', function() {
			return result.every(({ array }) =>
				expect(array).to.equal(newArray)
			);
		});
	});
});
