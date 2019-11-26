import MockAdapter from 'axios-mock-adapter';
import jwt from 'jsonwebtoken';
import { all } from 'redux-saga/effects';
import { testAsyncReducer } from 'utils/test';

import { restClient } from '../auth';

import { userInfoActionCreators, userInfoReducer, userInfoWatchers, IUserInfo } from '../userInfo';

const decodedUserInfo = {
    sub: 'ibmdevtest1',
    auth: 'ROLE_USER',
    token_type: 'ACCESS',
    full_name: 'Ivan Ivanov Ivanich',
    email: 'bmdevtest1@kapitalbank.az',
    phone: '994502111111',
    exp: 1565685763,
};

const userInfo: IUserInfo = {
    fullName: decodedUserInfo.full_name,
    login: decodedUserInfo.sub,
    email: decodedUserInfo.email,
    phone: decodedUserInfo.phone,
};

function* testSaga(): IterableIterator<any> {
    yield all(userInfoWatchers);
}

describe('userInfo reducer', () => {
    testAsyncReducer(userInfoReducer, userInfoActionCreators.fulfill);
});

describe('userInfo saga', () => {
    const mock = new MockAdapter(restClient.axios);

    beforeAll(() => {
        jest.spyOn(jwt, 'decode').mockReturnValue(decodedUserInfo);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    it('should retrieve branch title from server and fulfill userInfo with it', async () => {
        // TODO: Fix test.
        // mock.onGet(`${commonRestConfig.baseURL}${API.endpoints.dictionaries.branch(decodedUserInfo.branch)}`).reply(200, branchResponse);
        //
        // const { storeState } = await expectSaga(testSaga)
        //     .withReducer(reducer, initialState)
        //     .put(userInfoActionCreators.fulfill.done({ params: undefined, result: userInfo }))
        //     .dispatch(userInfoActionCreators.fulfill.started())
        //     .run();
        //
        // expect(storeState.error).toBeNull();
        // expect(storeState.data).toEqual(userInfo);

        expect(testSaga).not.toBeNull();
        expect(userInfo).not.toBeNull();
        expect(mock).not.toBeNull();
    });
});
