const { expect } = require('./support/chai'),
	{ getArray, getInt } = require('./support/data-factory'),
	{ getCallback } = require('./support/helpers'),
	{
		rejectsWithError,
		ranCallbacksInOrder,
		hasAccessToCorrectArgumentsOnCallback
	} = require('./support/spec-helpers'),
	{ providedThisArg } = require('./support/constants'),
	{ asyncFind } = require('../src');

context('Async Find', () => {
	let array;

	beforeEach(() => {
		array = getArray();
	});

	describe('Given no arguments', () => {
		it('Should reject with "TypeError: undefined is not iterable"', () =>
			rejectsWithError(
				asyncFind(),
				new TypeError('undefined is not iterable')
			));
	});

	describe('Given no callback', () => {
		it('Should reject with "TypeError: undefined is not a function"', () =>
			rejectsWithError(
				asyncFind(array),
				new TypeError('undefined is not a function')
			));
	});

	describe('Given a synchronous callback', () => {
		let result, callback, findIndex, foundElement;

		beforeEach(async () => {
			findIndex = getInt({ min: 0, max: array.length });

			({ result, callback } = getCallback({
				isFind: true,
				findIndex
			}));

			foundElement = await asyncFind(array, callback);
		});

		it('Should run each callback in order', () =>
			ranCallbacksInOrder(result));

		it('Should find the correct element', () =>
			expect(foundElement).to.equal(array[findIndex]));
	});

	describe('Given an asynchronous callback', () => {
		let result, callback, findIndex, foundElement;

		beforeEach(async () => {
			findIndex = getInt({ min: 0, max: array.length });

			({ result, callback } = getCallback({
				isFind: true,
				isAsync: true,
				findIndex
			}));

			foundElement = await asyncFind(array, callback);
		});

		it('Should run each callback in order', () =>
			ranCallbacksInOrder(result));

		it('Should find the correct element', async () => {
			expect(foundElement).to.equal(array[findIndex]);
		});
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
			rejectsWithError(asyncFind(array, callback), error));
	});

	describe('Given a callback that uses all arguments', () => {
		let result, callback;

		beforeEach(async () => {
			({ result, callback } = getCallback());

			await asyncFind(array, callback);
		});

		it('Should have access to currentValue, index and array on the callback', () =>
			hasAccessToCorrectArgumentsOnCallback(array, result, [
				'currentValue',
				'index',
				'array'
			]));
	});

	describe('Given the optional thisArg parameter', () => {
		let result, callback;

		beforeEach(async () => {
			({ result, callback } = getCallback());

			await asyncFind(array, callback, providedThisArg);
		});

		it('Should have accesss to thisArg on callback', () =>
			result.every(({ thisArg }) =>
				expect(thisArg.toString()).to.equal(providedThisArg.toString())
			));
	});
});
