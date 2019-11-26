import { getStorageKey } from '../storage';

describe('storage', () => {
    it('getStorageKey', () => {
        expect(getStorageKey('1234567', '7654321', 'someString')).toBe('1234567:7654321:someString');
    });
});
