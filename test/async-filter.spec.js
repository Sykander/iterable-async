const { expect } = require('./support/chai'),
	{ getArray, getString } = require('./support/helpers'),
	asyncFilterFunction = require('../src/async-filter');

context('Async Filter', function() {
	let array, asyncFilter;

	beforeEach(() => {
		(array = getArray()), (asyncFilter = asyncFilterFunction.bind(array));
	});

	describe('Given no arguments', function() {
		it('Should reject with "TypeError: undefined is not a function"', async function() {
			await expect(asyncFilter()).to.rejectedWith(
				'undefined is not a function'
			);
		});
	});

	describe('Given a synchronous callback', function() {
		let result, callback;

		beforeEach(() => {
			(result = []), (callback = (item, index) => result.push(index));
		});

		it('Should run each callback in order', async function() {
			const expectedResult = Array.from(Array(array.length).keys());

			await asyncFilter(callback);

			expectedResult.every((expectedItem, index) =>
				expect(expectedItem).to.equal(result[index])
			);
		});

		it('Should filter each item based on callback result', async function() {
			const allTrueArr = await asyncFilter(() => true);

			array.every((item, index) =>
				expect(item).to.equal(allTrueArr[index])
			);

			const allFalseArr = await asyncFilter(() => false);

			expect(allFalseArr).to.have.property('length', 0);

			const expectedResult = [];
			const randomResultArr = await asyncFilter(() => {
				const randomBool = Math.random() > 0.5;

				expectedResult.push(randomBool);

				return randomBool;
			});

			array.every((item, index) => {
				const shouldRemain = expectedResult[index];

				if (shouldRemain) {
					return expect(randomResultArr).to.contain(item);
				}

				// item cannot be tested further
				return true;
			});

			expect(randomResultArr)
				.to.have.property('length')
				.which.equals(expectedResult.filter(item => item).length);
		});

		it('Should resolve to a new array', async function() {
			const filteredArray = await asyncFilter(callback);

			expect(filteredArray).to.not.equal(array);
		});
	});

	describe('Given a sychronous callback and array', function() {
		let result, callback;

		beforeEach(() => {
			(result = []), (callback = item => result.push(item));
		});

		it('Should run each callback in order', async function() {
			const expectedResult = array.slice();

			await asyncFilter(callback, array);

			expectedResult.every((expectedItem, index) =>
				expect(expectedItem).to.equal(result[index])
			);
		});
	});

	describe('Given an async callback', function() {
		let result, callback;

		beforeEach(() => {
			(result = []),
				(callback = item =>
					new Promise(resolve =>
						setTimeout(() => resolve(result.push(item)), 0)
					));
		});

		it('Should run each callback independently of order', async function() {
			const expectedResult = array.slice();

			await asyncFilter(callback);

			expectedResult.every(item => expect(result).to.contain(item));
		});
	});

	describe('Given an async callback and array', function() {
		let result, callback;

		beforeEach(() => {
			(result = []),
				(callback = item =>
					new Promise(resolve =>
						setTimeout(() => resolve(result.push(item)), 0)
					));
		});

		it('Should run each callback independently of order', async function() {
			const expectedResult = array.slice();

			await asyncFilter(callback, array);

			expectedResult.every(item => expect(result).to.contain(item));
		});
	});

	describe('Given a callback that throws an error', function() {
		const string = getString(),
			error = new Error(string),
			callback = () => {
				throw error;
			};

		it('Should reject with that error', async function() {
			await expect(asyncFilter(callback)).to.rejectedWith(string);
		});
	});

	describe('Given a callback that throws an error and an array', function() {
		const string = getString(),
			error = new Error(string),
			callback = () => {
				throw error;
			};

		it('Should reject with that error', async function() {
			await expect(asyncFilter(callback, array)).to.rejectedWith(string);
		});
	});

	describe('Given a callback that uses additional parameters', function() {
		let result, callback;

		beforeEach(() => {
			(result = []),
				(callback = (item, index, array) =>
					result.push({
						item,
						index,
						array
					}));
		});

		it('Should have the correct element', async function() {
			await asyncFilter(callback);

			array.every((expectedItem, expectedIndex) => {
				const { item: actualItem } = result[expectedIndex];

				return expect(actualItem).to.equal(expectedItem);
			});
		});

		it('Should have correct index for each callback', async function() {
			await asyncFilter(callback);

			array.every((item, expectedIndex) => {
				const { index: actualIndex } = result[expectedIndex];

				return expect(actualIndex).to.equal(expectedIndex);
			});
		});

		it('Should have access to the source array', async function() {
			await asyncFilter(callback);

			array.every((item, index, expectedArray) => {
				const { array: actualArray } = result[index];

				return expect(actualArray).to.equal(expectedArray);
			});
		});
	});
});
