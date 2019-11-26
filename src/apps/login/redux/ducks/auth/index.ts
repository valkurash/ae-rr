/**
 * @file Auth ducks.
 */

import { DEFAULT_PATH, TOKEN_NAME, TOKEN_REFRESH_NAME } from 'consts';
import { IAsyncData, IError, IItem } from 'models';
import { combineReducers } from 'redux';
import { SagaIterator } from 'redux-saga';
import { apply, call, takeEvery } from 'redux-saga/effects';
import actionCreatorFactory from 'typescript-fsa';
import { bindAsyncAction } from 'typescript-fsa-redux-saga';
import { asyncReducerGen, getInitialAsyncData, safeCall } from 'utils/redux';
import { redirect, RestClient } from 'utils/rest';

import { ILoginReduxState } from '../../models';
import { getDuckActionNamespace } from '../../utils';

import { API } from './api';

const reducerName = 'auth';

//#region Models

/** Login data (client). */
export interface ILoginClient {
    /** Username. */
    username: string;

    /** Password. */
    password: string;
}

/** Login data (server). */
export interface ILoginServer {
    /** AccessToken. */
    [TOKEN_NAME]: string;

    /** RefreshToken. */
    [TOKEN_REFRESH_NAME]: string;
}

/** Auth Redux state. */
export interface IAuthReduxState {
    /** Login. */
    login: IAsyncData<ILoginServer>;
}

/** Response format for login REST method. */
export interface ILoginRs extends IItem<ILoginServer> {}

/** Request format for login REST method. */
export interface ILoginRq extends ILoginClient {}

//#endregion

//#region Action Creators

/** Auth action creator factory. */
const actionCreator = actionCreatorFactory(getDuckActionNamespace(reducerName));

/** Login user. */
export const login = actionCreator.async<ILoginClient, ILoginRs, IError>('LOGIN');

//#endregion

//#region Reducers

/** Auth initial redux store state. */
export const authInitialState: IAuthReduxState = {
    login: getInitialAsyncData<ILoginServer>(),
};

/** Auth login reducer. */
export const loginReducer = asyncReducerGen<ILoginClient, ILoginServer>(login);

/** Auth reducer. */
export default combineReducers<IAuthReduxState>({
    login: loginReducer,
});

//#endregion.

//#region Services

export const restClient = new RestClient();

/** Auth service. */
export const AuthService = {
    /** Login user. */
    login(data: ILoginRq): Promise<ILoginRs> {
        return restClient.post<ILoginRq, ILoginRs>(API.login, data);
    },
};

//#endregion

//#region Sagas

/** Auth saga worker. */
const loginWorker = bindAsyncAction(login, { skipStartedAction: true })(function*(params: ILoginClient): SagaIterator {
    const response: IItem<ILoginServer> = yield call(AuthService.login, params);
    if (response.data && response.data[TOKEN_NAME]) {
        yield apply(localStorage, localStorage.setItem, [TOKEN_NAME, response.data[TOKEN_NAME]]);
        yield apply(localStorage, localStorage.setItem, [TOKEN_REFRESH_NAME, response.data[TOKEN_REFRESH_NAME]]);

        yield call(redirect, DEFAULT_PATH);
    }
    return response;
});

/** Auth saga. */
export const authLoginSagaWatcher = [takeEvery(login.started.type, safeCall<ILoginClient>(loginWorker))];

//#endregion

//#region Selectors

/** Auth selectors. */
export const AuthSelectors = {
    /** Returns auth redux state.  */
    getAuthBranch(state: ILoginReduxState): IAuthReduxState {
        return state.auth;
    },

    /** Returns login branch from redux state.  */
    getLoginInfo(state: ILoginReduxState): IAsyncData<ILoginServer> {
        return this.getAuthBranch(state).login;
    },
};

//#endregion
