import { AxiosError } from 'axios';

import { IError } from 'models';

import { errorWrapper, isError } from '../error';

import '../../i18n';

describe('Error Utils test', () => {
    describe('isError utility', () => {
        it('should exists', () => {
            expect(isError).toBeInstanceOf(Function);
        });

        it('should return true for errorContained object', () => {
            const test: IError = {
                message: 'Error text',
                uuid: 'xxxx-xxxx-xxxx',
                code: 'FORBIDDEN',
            };

            expect(isError(test)).toBeTruthy();
        });

        it('should return false for not error object', () => {
            const test: IError = {
                httpCode: 200,
            };

            expect(isError(test)).toBeFalsy();
        });
    });

    describe('errorWrapper utility', () => {
        it('Should exists', () => {
            expect(errorWrapper).toBeInstanceOf(Function);
        });

        it('should return response.data if response is wrapped error', async () => {
            const test: AxiosError = {
                config: {},
                message: 'test',
                name: 'test',
                response: {
                    config: {},
                    data: {
                        code: 'ERROR',
                        message: 'Test message',
                    },
                    headers: null,
                    status: 404,
                    statusText: 'test',
                },
            };

            expect(await errorWrapper(test)).toEqual({
                ...test.response.data,
                error: true,
                httpCode: test.response.status,
            });
        });

        it('should return wrapped error for JSON response', async () => {
            const test: AxiosError = {
                config: {},
                message: 'test',
                name: 'test',
                response: {
                    config: {},
                    data: 'Not found',
                    headers: {
                        'content-type': 'application/json; charset=utf-8',
                    },
                    status: 404,
                    statusText: 'TEST_NOT_FOUND',
                },
            };

            const testReceive: IError = {
                code: test.response.statusText,
                httpCode: test.response.status,
                message: 'Common:Error.unknown',
                error: true,
            };

            expect(await errorWrapper(test)).toEqual(testReceive);
        });

        it('should return wrapped error for HTML response', async () => {
            const test: AxiosError = {
                config: {},
                message: 'test',
                name: 'test',
                response: {
                    config: {},
                    data: 'Not found',
                    headers: {
                        'content-type': 'text/html; charset=utf-8',
                    },
                    status: 404,
                    statusText: 'TEST_NOT_FOUND',
                },
            };

            const testReceive: IError = {
                code: test.response.statusText,
                httpCode: test.response.status,
                message: 'Common:Error.unknown',
                error: true,
            };

            expect(await errorWrapper(test)).toEqual(testReceive);
        });
    });
});
