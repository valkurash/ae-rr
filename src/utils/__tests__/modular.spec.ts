import { isPromise } from '../modular';

// This looks similar enough to a promise
// that promises/A+ says we should treat
// it as a promise.
// tslint:disable-next-line:no-empty only-arrow-functions object-literal-shorthand typedef
const promise = { then: function() {} };

describe('modular', () => {
    describe('isPromise', () => {
        it('with a promise returns true', () => {
            expect(isPromise(promise)).toBeTruthy();
        });

        it('with null returns false', () => {
            expect(isPromise(null) === false).toBeFalsy();
        });

        it('with undefined returns false', () => {
            expect(isPromise(undefined) === false).toBeFalsy();
        });

        it('with a number returns false', () => {
            expect(isPromise(0)).toBeFalsy();
            expect(isPromise(-42)).toBeFalsy();
            expect(isPromise(42)).toBeFalsy();
        });

        it('with a string returns false', () => {
            expect(isPromise('')).toBeFalsy();
            expect(isPromise('then')).toBeFalsy();
        });

        it('with a bool returns false', () => {
            expect(isPromise(false)).toBeFalsy();
            expect(isPromise(true)).toBeFalsy();
        });

        it('with an object returns false', () => {
            expect(isPromise({})).toBeFalsy();
            expect(isPromise({ then: true })).toBeFalsy();
        });

        it('with an array returns false', () => {
            expect(isPromise([])).toBeFalsy();
            expect(isPromise([true])).toBeFalsy();
        });
    });
});
