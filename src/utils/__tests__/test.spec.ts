import { isSimilar, isSimilarArrays } from '../test';

describe('testUtils methods', () => {
    it('should be similar object', () => {
        const orig = { testKey1: 1, testKey2: 2 };
        const testing = { testKey1: 1, testKey2: 2, otherKeys: 3, notChecking: 4 };

        expect(isSimilar(orig, testing)).toBeTruthy();
    });

    it('should be similar object list', () => {
        const orig = [
            { testKey1: 1, testKey2: 2 },
            { testKey1: 12, testKey2: 22 },
        ];
        const testing = [
            { testKey1: 1, testKey2: 2, otherKeys: 3, notChecking: 4 },
            { testKey1: 12, testKey2: 22, otherKeys: 3, notChecking: 4 },
        ];

        expect(isSimilarArrays(orig, testing)).toBeTruthy();
    });
});
