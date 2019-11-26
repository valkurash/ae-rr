import axios, { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { DEFAULT_PATH } from 'consts';
import * as rest from 'utils/rest';

describe('rest', () => {
    const restClient = new rest.RestClient(axios);

    const mock = new MockAdapter(axios);
    const mockUrl = '/some/url/';
    const mockData = 'someData';

    it('works with async/await and resolves', async () => {
        mock.onGet(mockUrl).reply(200, { data: mockData });
        const result = await restClient.get(mockUrl);

        expect(result).toEqual({ data: mockData });
    });

    it('works with async/await and rejects with 401', () => {
        mock.onGet(mockUrl).reply(401, {
            statusText: '401',
            status: 401,
        });
        const redirectSpy = jest.spyOn(rest, 'redirect').mockImplementation(() => true);
        jest.spyOn(window.location, 'assign').mockImplementation(() => true);

        restClient.get(mockUrl).catch((error: AxiosError) => {
            expect(error.code).toEqual('401');
            expect(redirectSpy).toHaveBeenCalledWith(DEFAULT_PATH);
        });
    });

    it('works with async/await and rejects with undeclared httpCode', () => {
        mock.onGet(mockUrl).reply(404, {
            statusText: '404',
            status: 404,
        });

        return expect(restClient.get(mockUrl)).rejects.toEqual({
            code: 'UNKNOWN_ERROR',
            error: true,
            httpCode: 404,
            message: undefined,
        });
    });
});
