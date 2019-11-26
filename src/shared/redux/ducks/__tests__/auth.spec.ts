import MockAdapter from 'axios-mock-adapter';
import { expectSaga } from 'redux-saga-test-plan';
import { all } from 'redux-saga/effects';

import { commonRestConfig, DEFAULT_PATH } from 'consts';
import { api } from 'shared/api';
import { redirect } from 'utils/rest';

import { authActionCreators, authWatchers, restClient } from '../auth';

function* testSaga(): IterableIterator<any> {
    yield all(authWatchers);
}

describe('Auth sagas', () => {
    const mock = new MockAdapter(restClient.axios);

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it('should logout with redirect', async () => {
        mock.onGet(`${commonRestConfig.baseURL}${api.endpoints.auth.logout}`).reply(200);
        jest.spyOn(window.location, 'assign').mockImplementation(url => console.log(url));

        return expectSaga(testSaga)
            .put(authActionCreators.logout.done({ params: undefined, result: undefined }))
            .call(redirect, DEFAULT_PATH)
            .dispatch(authActionCreators.logout.started())
            .run();
    });
});
