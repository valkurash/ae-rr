import { all } from '@redux-saga/core/effects';
import MockAdapter from 'axios-mock-adapter';
import { expectSaga } from 'redux-saga-test-plan';

import { commonRestConfig, DEFAULT_PATH, TOKEN_NAME, TOKEN_REFRESH_NAME } from 'consts';
import { redirect } from 'utils/rest';

import { API } from '../api';
import reducer, { authInitialState, login, restClient, authLoginSagaWatcher } from '../index';

const params = {
    username: 'admin',
    password: '123456',
};
const result = { [TOKEN_NAME]: '123', [TOKEN_REFRESH_NAME]: '567' };

function* rootSaga(): IterableIterator<any> {
    yield all([...authLoginSagaWatcher]);
}

describe('login app Auth sagas', () => {
    const mock = new MockAdapter(restClient.axios);
    const reqHandler = mock.onPost(`${commonRestConfig.baseURL}${API.login}`);

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it('should retrieve error without redirect', async () => {
        const response = {
            code: 'FORBIDDEN',
            message: 'User authentication failed.',
        };
        const error = { error: true, httpCode: 403, ...response };
        reqHandler.reply(403, response);

        const { storeState } = await expectSaga(rootSaga)
            .withReducer(reducer, authInitialState)
            .put(login.failed({ params, error }))
            .dispatch(login.started(params))
            .run();

        expect(storeState.login.error).toEqual(error);
    });

    it('should login with redirect', async () => {
        const response = { data: result };
        reqHandler.reply(200, response);
        jest.spyOn(window.location, 'assign').mockImplementation(url => console.log(url));

        const { storeState } = await expectSaga(rootSaga)
            .withReducer(reducer, authInitialState)
            .put(login.done({ params, result: response }))
            .call(redirect, DEFAULT_PATH)
            .dispatch(login.started(params))
            .run();

        expect(storeState.login.error).toBeUndefined();
        expect(storeState.login.data).toEqual(result);
    });
});
