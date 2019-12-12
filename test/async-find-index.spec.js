const { expect } = require('./support/chai'),
	{ getArray, getInt } = require('./support/data-factory'),
	{
		getSyncCallback,
		getAsyncCallback,
		getErrorCallback
	} = require('./support/helpers'),
	{
		rejectsWithError,
		ranCallbacksInOrder,
		hasAccessToCorrectArgumentsOnCallback
	} = require('./support/spec-helpers'),
	{ asyncFindIndex: asyncFindIndexFunction } = require('../src');

context('Async Find Index', () => {
	let array, asyncFindIndex;

	beforeEach(() => {
		(array = getArray()),
			(asyncFindIndex = asyncFindIndexFunction.bind(array));
	});

	describe('Given no arguments', () => {
		it('Should reject with "TypeError: undefined is not a function"', () =>
			rejectsWithError(
				asyncFindIndex(),
				new TypeError('undefined is not a function')
			));
	});

	describe('Given a synchronous callback', () => {
		let result, callback, findIndex, foundIndex;

		beforeEach(async () => {
			findIndex = getInt({ min: -1, max: array.length });

			({ result, callback } = getSyncCallback({
				isFind: true,
				findIndex
			}));

			foundIndex = await asyncFindIndex(callback);
		});

		it('Should run each callback in order', () =>
			ranCallbacksInOrder(result));

		it('Should find the correct index', () =>
			expect(foundIndex).to.equal(findIndex));

		it('Should always resolve to an integer', () =>
			expect(
				typeof foundIndex === 'number' &&
					foundIndex === Math.floor(foundIndex)
			).to.equal(true));
	});

	describe('Given an asynchronous callback', () => {
		let result, callback, findIndex, foundIndex;

		beforeEach(async () => {
			findIndex = getInt({ min: 0, max: array.length });

			({ result, callback } = getAsyncCallback({
				isFind: true,
				findIndex
			}));

			foundIndex = await asyncFindIndex(callback);
		});

		it('Should run each callback in order', () =>
			ranCallbacksInOrder(result));

		it('Should find the correct index', () =>
			expect(foundIndex).to.equal(findIndex));

		it('Should always resolve to an integer', () =>
			expect(
				typeof foundIndex === 'number' &&
					foundIndex === Math.floor(foundIndex)
			).to.equal(true));
	});

	describe('Given a callback that throws an error', () => {
		let callback, string;

		beforeEach(() => ({ callback, string } = getErrorCallback()));

		it('Should reject with that error', async () => {
			await expect(asyncFindIndex(callback)).to.rejectedWith(string);
		});
	});

	describe('Given a callback that uses additional parameters', () => {
		let result, callback;

		beforeEach(async () => {
			({ result, callback } = getSyncCallback());

			await asyncFindIndex(callback);
		});

		it('Should have access to currentValue, index and array on the callback', () =>
			hasAccessToCorrectArgumentsOnCallback(array, result));
	});

	describe('Given the optional thisArg parameter', () => {
		let result, callback, newArray;

		beforeEach(async () => {
			newArray = getArray();

			({ result, callback } = getSyncCallback());

			await asyncFindIndex(callback, newArray);
		});

		it('Should loop over the given thisArg', () => {
			return result.every(({ array }) =>
				expect(array).to.equal(newArray)
			);
		});
	});
});
