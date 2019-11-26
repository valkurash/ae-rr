import { EProcessStatus } from 'enums';

import { getAsyncArray, getAsyncData, getInitialAsyncData } from '../redux';

describe('Testing redux utils functions', () => {
    it('initialAsyncData is Defined', () => {
        expect(getInitialAsyncData()).toBeDefined();
    });
    it('initialAsyncData has status, data, error fields', () => {
        expect(getInitialAsyncData().data).toBeUndefined();
        expect(getInitialAsyncData().meta).toBeUndefined();
        expect(getInitialAsyncData().error).toBeUndefined();
        expect(getInitialAsyncData().status).toBe(EProcessStatus.IDLE);
    });

    it('getAsyncData has keys data, error, status', () => {
        const data = getAsyncData();

        expect(data.data).toBeUndefined();
        expect(data.meta).toBeUndefined();
        expect(data.error).toBeUndefined();
        expect(data.status).toBe(EProcessStatus.IDLE);
    });

    it('getAsyncArray return array with items contain asyncData', () => {
        const array = [1, 2, 3];
        const asyncArr = getAsyncArray(array);

        asyncArr.forEach((item, key) => {
            expect(item.status).toBe(EProcessStatus.IDLE);
            expect(item.data).toBe(array[key]);
            expect(item.error).toBeUndefined();
        });
    });
});
