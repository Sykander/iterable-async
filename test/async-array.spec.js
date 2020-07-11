const { expect } = require('./support/chai'),
	{ getArray, getInt } = require('./support/data-factory'),
	{ ranCallbacksInOrder } = require('./support/spec-helpers'),
	{ getCallback } = require('./support/helpers'),
	AsyncArray = require('../src');

context('Async Array', () => {
	describe('Class attributes and properties', () => {
		it('Should inherit from Array', () => {
			expect(AsyncArray.prototype).to.be.instanceOf(Array);
		});

		it('Should instantiate an AsyncArray object', () => {
			expect(new AsyncArray()).to.be.instanceOf(AsyncArray);
		});
	});

	describe('An instance of the class', () => {
		let array, asyncArray;

		beforeEach(() => {
			array = getArray({ min: 2 });
			asyncArray = new AsyncArray(...array);
		});

		it('Should be able to use asyncFilter', async () => {
			const { result, callback } = getCallback({ isAsync: true }),
				filteredArray = await asyncArray.asyncFilter(callback);

			ranCallbacksInOrder(result);
			array.every(item => {
				if (item) {
					return expect(filteredArray).to.contain(item);
				} else {
					return expect(filteredArray).to.not.contain(item);
				}
			});
		});

		it('Should be able to use asyncFindIndex', async () => {
			const findIndex = getInt({ min: 0, max: array.length }),
				{ result, callback } = getCallback({
					isFind: true,
					isAsync: true,
					findIndex
				}),
				foundIndex = await asyncArray.asyncFindIndex(callback);

			ranCallbacksInOrder(result);
			expect(foundIndex).to.equal(findIndex);
		});

		it('Should be able to use asyncFind', async () => {
			const findIndex = getInt({ min: 0, max: array.length }),
				{ result, callback } = getCallback({
					isFind: true,
					isAsync: true,
					findIndex
				}),
				foundElement = await asyncArray.asyncFind(callback);

			ranCallbacksInOrder(result);
			expect(foundElement).to.equal(array[findIndex]);
		});

		it('Should be able to use asyncForEach', async () => {
			const { result, callback } = getCallback({ isAsync: true });
			await asyncArray.asyncForEach(callback);

			ranCallbacksInOrder(result);
		});

		it('Should be able to use asyncMapSort', async () => {
			const { result, callback: mappingFunction } = getCallback({
					isAsync: true
				}),
				mapSortedArray = await asyncArray.asyncMapSort(mappingFunction);

			ranCallbacksInOrder(result);
			const expectedResult = mapSortedArray.slice().sort();
			expectedResult.every((item, index) =>
				expect(mapSortedArray[index]).to.equal(item)
			);
		});

		it('Should be able to use asyncMap', async () => {
			const { result, callback } = getCallback({ isAsync: true }),
				mappedArray = await asyncArray.asyncMap(callback);

			ranCallbacksInOrder(result);
			mappedArray.every((item, index) =>
				expect(item).to.equal(array[index])
			);
		});

		it('Should be able to use asyncReduce', async () => {
			const { result, callback } = getCallback({
					isAsync: true,
					isReduce: true
				}),
				reducedAccumulator = await asyncArray.asyncReduce(callback, []);

			ranCallbacksInOrder(result, { skipFirst: false });
			result.every(({ item }, index) => {
				return expect(reducedAccumulator[index].item).to.equal(item);
			});
			expect(result.length).to.be.greaterThan(
				0,
				'No callbacks were run.'
			);
		});

		it('Should be able to use asyncSort', async () => {
			const { callback: compareFunc } = getCallback({ isSort: true }),
				sortedArray = await asyncArray.asyncSort(compareFunc);

			sortedArray.every((item, index) =>
				expect(item).to.equal(asyncArray[index])
			);
			expect(sortedArray).to.equal(asyncArray);
		});
	});

	describe('Class prototypical methods', () => {
		it('Should have access to the asyncFilter method', () => {
			expect(AsyncArray.prototype.asyncFilter).to.be.a('function');
		});

		it('Should have access to the asyncFindIndex method', () => {
			expect(AsyncArray.prototype.asyncFindIndex).to.be.a('function');
		});

		it('Should have access to the asyncFind method', () => {
			expect(AsyncArray.prototype.asyncFind).to.be.a('function');
		});

		it('Should have access to the asyncForEach method', () => {
			expect(AsyncArray.prototype.asyncForEach).to.be.a('function');
		});

		it('Should have access to the asyncMapSort method', () => {
			expect(AsyncArray.prototype.asyncMapSort).to.be.a('function');
		});

		it('Should have access to the asyncMap method', () => {
			expect(AsyncArray.prototype.asyncMap).to.be.a('function');
		});

		it('Should have access to the asyncReduce method', () => {
			expect(AsyncArray.prototype.asyncReduce).to.be.a('function');
		});

		it('Should have access to the asyncSort method', () => {
			expect(AsyncArray.prototype.asyncSort).to.be.a('function');
		});
	});

	describe('Class static methods', () => {
		it('Should have access to the static asyncFilter method', () =>
			expect(AsyncArray.asyncFilter).to.be.a('function'));

		it('Should have access to the static asyncFindIndex method', () =>
			expect(AsyncArray.asyncFindIndex).to.be.a('function'));

		it('Should have access to the static asyncFind method', () =>
			expect(AsyncArray.asyncFind).to.be.a('function'));

		it('Should have access to the static asyncForEach method', () =>
			expect(AsyncArray.asyncForEach).to.be.a('function'));

		it('Should have access to the static asyncMapSort method', () =>
			expect(AsyncArray.asyncMapSort).to.be.a('function'));

		it('Should have access to the static asyncMap method', () =>
			expect(AsyncArray.asyncMap).to.be.a('function'));

		it('Should have access to the static asyncReduce method', () =>
			expect(AsyncArray.asyncReduce).to.be.a('function'));

		it('Should have access to the static asyncSort method', () =>
			expect(AsyncArray.asyncSort).to.be.a('function'));
	});
});
