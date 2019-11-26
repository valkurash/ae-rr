/**
 * @file Auth ducks.
 */

import { SagaIterator } from 'redux-saga';
import { apply, call, takeEvery } from 'redux-saga/effects';
import actionCreatorFactory, { Action } from 'typescript-fsa';
import { bindAsyncAction } from 'typescript-fsa-redux-saga';

import { DEFAULT_PATH, TOKEN_NAME, TOKEN_REFRESH_NAME } from 'consts';
import { IError } from 'models';
import { api } from 'shared/api';
import { safeCall } from 'utils/redux';
import { redirect, RestClient } from 'utils/rest';

import { getDuckActionNamespace } from '../utils';

const reducerName = 'auth';

//#region Action Creators

/** Auth action creator factory. */
const actionCreator = actionCreatorFactory(getDuckActionNamespace(reducerName));

/** Auth action creators. */
export const authActionCreators = {
    /** Logout user. */
    logout: actionCreator.async<void, void, IError>('LOGOUT'),
};

//#endregion

//#region Services

export const restClient = new RestClient();

/** Auth service. */
export const authService = {
    /** Logout user. */
    logout(): Promise<void> {
        return restClient.get<void>(api.endpoints.auth.logout);
    },
};

//#endregion

//#region Sagas.

/** Logout worker. */
const logoutWorker = bindAsyncAction(authActionCreators.logout, { skipStartedAction: true })(function*(): SagaIterator {
    yield call(authService.logout);
    yield apply(localStorage, localStorage.removeItem, [TOKEN_NAME]);
    yield apply(localStorage, localStorage.removeItem, [TOKEN_REFRESH_NAME]);
    yield call(redirect, DEFAULT_PATH);
});

/** Auth saga. */
export const authWatchers = [takeEvery<Action<void>>(authActionCreators.logout.started.type, safeCall<void>(logoutWorker))];

//#endregion
