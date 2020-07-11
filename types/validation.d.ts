/**
 * Validate an item's iterability
 * @param {any} item
 * @return {Boolean} validated?
 * @throws {TypeError}
 */
export function validateIsIterable(item: any): boolean;
/**
 * Validate an item is a function
 * @param {any} item
 * @return {Boolean} validated?
 * @throws {TypeError}
 */
export function validateIsFunction(item: any): boolean;
/**
 * Validate if an item has length greater than 0
 * @param {any} item
 * @return {Boolean} validated?
 * @throws {TypeError}
 */
export function validateNonZeroLength(item: any): boolean;
