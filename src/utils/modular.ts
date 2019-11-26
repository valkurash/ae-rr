/**
 * Checks if `value` is classified as a `Promise`.
 */
export function isPromise<T = any>(value: any): value is PromiseLike<T> {
    return value && typeof value.then === 'function';
}
