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
	{ asyncFind: asyncFindFunction } = require('../src');

context('Async Find', () => {
	let array, asyncFind;

	beforeEach(() => {
		(array = getArray()), (asyncFind = asyncFindFunction.bind(array));
	});

	describe('Given no arguments', () => {
		it('Should reject with "TypeError: undefined is not a function"', () =>
			rejectsWithError(
				asyncFind(),
				new TypeError('undefined is not a function')
			));
	});

	describe('Given a synchronous callback', () => {
		let result, callback, findIndex, foundElement;

		beforeEach(async () => {
			findIndex = getInt({ min: 0, max: array.length });

			({ result, callback } = getSyncCallback({
				isFind: true,
				findIndex
			}));

			foundElement = await asyncFind(callback);
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

			({ result, callback } = getAsyncCallback({
				isFind: true,
				findIndex
			}));

			foundElement = await asyncFind(callback);
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
				} = getErrorCallback())
		);

		it('Should reject with that error', async () =>
			rejectsWithError(asyncFind(callback), error));
	});

	describe('Given a callback that uses additional parameters', () => {
		let result, callback;

		beforeEach(async () => {
			({ result, callback } = getSyncCallback());

			await asyncFind(callback);
		});

		it('Should have access to currentValue, index and array on the callback', () =>
			hasAccessToCorrectArgumentsOnCallback(array, result));
	});

	describe('Given the optional thisArg parameter', () => {
		let result, callback, newArray;

		beforeEach(async () => {
			newArray = getArray();

			({ result, callback } = getSyncCallback());

			await asyncFind(callback, newArray);
		});

		it('Should loop over the given thisArg', () => {
			return result.every(({ array }) =>
				expect(array).to.equal(newArray)
			);
		});
	});
});
