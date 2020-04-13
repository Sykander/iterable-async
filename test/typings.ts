// Confirm module can be imported
import * as AsyncArray from '../src/index.js';

// Allow TypeScript to construct
const RealAsyncArray: any = AsyncArray;

// Create an instance
const asyncArray = new RealAsyncArray();

// Use an async method and export
export default asyncArray.asyncSort();
