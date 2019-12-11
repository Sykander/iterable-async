const { expect } = require('./support/chai'),
	{ getArray, getInt } = require('./support/data-factory'),
	{
		getSyncCallback,
		getAsyncCallback,
		getErrorCallback
	} = require('./support/helpers'),
	asyncFindFunction = () => undefined; // TODO: Implement Async Find

context('Async Find', function() {
	let array, asyncFind;

	beforeEach(() => {
		(array = getArray()), (asyncFind = asyncFindFunction.bind(array));
	});

	describe('Given no arguments', function() {
		it('Should reject with "TypeError: undefined is not a function"', async function() {
			await expect(asyncFind()).to.rejectedWith(
				'undefined is not a function'
			);
		});
	});

	describe('Given a synchronous callback', function() {
		let result, callback, findIndex, foundElement;

		beforeEach(async () => {
			findIndex = getInt({ min: 0, max: array.length });

			({ result, callback } = getSyncCallback({
				isFind: true,
				findIndex
			}));

			foundElement = await asyncFind(callback);
		});

		it('Should run each callback in order', async function() {
			result.every(({ index: expectedIndex }, actualIndex) =>
				expect(actualIndex).to.equal(expectedIndex)
			);
		});

		it('Should find the correct element', async function() {
			expect(foundElement).to.equal(array[findIndex]);
		});
	});

	describe('Given an asynchronous callback', function() {
		let result, callback, findIndex, foundElement;

		beforeEach(async () => {
			findIndex = getInt({ min: 0, max: array.length });

			({ result, callback } = getAsyncCallback({
				isFind: true,
				findIndex
			}));

			foundElement = await asyncFind(callback);
		});

		it('Should run each callback in order', async function() {
			result.every(({ index: expectedIndex }, actualIndex) =>
				expect(actualIndex).to.equal(expectedIndex)
			);
		});

		it('Should find the correct element', async function() {
			expect(foundElement).to.equal(array[findIndex]);
		});
	});

	describe('Given a callback that throws an error', function() {
		let callback, string;

		beforeEach(() => ({ callback, string } = getErrorCallback()));

		it('Should reject with that error', async function() {
			await expect(asyncFind(callback)).to.rejectedWith(string);
		});
	});

	describe('Given a callback that uses additional parameters', function() {
		let result, callback;

		beforeEach(async () => {
			({ result, callback } = getSyncCallback());

			await asyncFind(callback);
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

			await asyncFind(callback, newArray);
		});

		it('Should loop over the given thisArg', function() {
			return result.every(({ array }) =>
				expect(array).to.equal(newArray)
			);
		});
	});
});
