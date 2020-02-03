const { expect } = require('./support/chai'),
	{ getArray, getInt } = require('./support/data-factory'),
	{ getCallback } = require('./support/helpers'),
	{
		rejectsWithError,
		ranCallbacksInOrder,
		hasAccessToCorrectArgumentsOnCallback
	} = require('./support/spec-helpers'),
	{ providedThisArg } = require('./support/constants'),
	{ asyncFindIndex } = require('../src');

context('Async Find Index', () => {
	let array;

	beforeEach(() => {
		array = getArray();
	});

	describe('Given no arguments', () => {
		it('Should reject with "TypeError: undefined is not iterable"', () =>
			rejectsWithError(
				asyncFindIndex(),
				new TypeError('undefined is not iterable')
			));
	});

	describe('Given a synchronous callback', () => {
		let result, callback, findIndex, foundIndex;

		beforeEach(async () => {
			findIndex = getInt({ min: -1, max: array.length });

			({ result, callback } = getCallback({
				isFind: true,
				findIndex
			}));

			foundIndex = await asyncFindIndex(array, callback);
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

			({ result, callback } = getCallback({
				isFind: true,
				isAsync: true,
				findIndex
			}));

			foundIndex = await asyncFindIndex(array, callback);
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
		let callback, error;

		beforeEach(
			() =>
				({
					callback,
					meta: { error }
				} = getCallback({ isError: true }))
		);

		it('Should reject with that error', async () =>
			rejectsWithError(asyncFindIndex(array, callback), error));
	});

	describe('Given a callback that uses all arguments', () => {
		let result, callback;

		beforeEach(async () => {
			({ result, callback } = getCallback());

			await asyncFindIndex(array, callback);
		});

		it('Should have access to currentValue, index and array on the callback', () =>
			hasAccessToCorrectArgumentsOnCallback(array, result));
	});

	describe('Given the optional thisArg parameter', () => {
		let result, callback;

		beforeEach(async () => {
			({ result, callback } = getCallback());

			await asyncFindIndex(array, callback, providedThisArg);
		});

		it('Should have accesss to thisArg on callback', () =>
			result.every(({ thisArg }) =>
				expect(thisArg.toString()).to.equal(providedThisArg.toString())
			));
	});
});
