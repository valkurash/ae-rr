/**
 * @file User information ducks.
 */

import { TOKEN_NAME } from 'consts';
import jwt from 'jsonwebtoken';

import { IAsyncData, IItem } from 'models';
import { SagaIterator } from 'redux-saga';
import { apply, takeLeading } from 'redux-saga/effects';
import actionCreatorFactory from 'typescript-fsa';
import { bindAsyncAction } from 'typescript-fsa-redux-saga';
import { asyncReducerGen, getInitialAsyncData, safeCall } from 'utils/redux';

import { getDuckActionNamespace } from '../utils';

const reducerName = 'userInfo';

//#region Models

// TODO: change model when auth on back will be ready
/** User info base model. */
interface IUserInfoBase {
    /** Email. */
    email?: string;

    /** Phone. */
    phone?: string;

    /** Role */
    role?: string;
}

/** User info payload encoded in token. */
export interface IUserInfoPayload extends IUserInfoBase {
    /** Subject. */
    sub?: string;

    /** Full name. */
    full_name?: string;
}

/** User info. */
export interface IUserInfo extends IUserInfoBase {
    /** Full name. */
    fullName?: string;

    /** Login. */
    login?: string;
}

/** User info Redux state. */
export interface IUserInfoState extends IAsyncData<IUserInfo> {}

/** Redux state with user info. */
export interface IUserInfoReduxState {
    userInfo: IUserInfoState;
}

/** Response format for user info REST method. */
export interface IUserInfoRs extends IItem<IUserInfo> {}

//#endregion

//#region Action Creators

/** Action creator factory. */
const actionCreator = actionCreatorFactory(getDuckActionNamespace(reducerName));

/** User info action creators. */
export const userInfoActionCreators = {
    /** Fulfill user info. */
    fulfill: actionCreator.async<void, IUserInfoRs>('FULFILL'),
};

//#endregion

//#region Reducers

/** User info reducer initial state. */
export const initialState: IUserInfoState = getInitialAsyncData<IUserInfo>();

/** User info reducers. */
export const userInfoReducer = asyncReducerGen<void, IUserInfo>(userInfoActionCreators.fulfill);

export default userInfoReducer;

//#endregion

//#region Sagas

/** Workers. */
const userInfoWorkers = {
    /** Worker for fulfilling user info from token and server. */
    fulfill: bindAsyncAction(userInfoActionCreators.fulfill, { skipStartedAction: true })(function*(): SagaIterator {
        const token = yield apply(localStorage, localStorage.getItem, [TOKEN_NAME]);
        const userInfoPayload: IUserInfoPayload = yield apply(jwt, jwt.decode, [token]);
        const userInfo: IUserInfo = {};

        // TODO: change model when auth on back will be ready
        if (userInfoPayload) {
            //userInfo.email = userInfoPayload.email;
            //userInfo.phone = userInfoPayload.phone;
            //userInfo.fullName = userInfoPayload.full_name;
            userInfo.login = userInfoPayload.sub;
            userInfo.role = userInfoPayload.role;
        }
        return { data: userInfo };
    }),
};

/** Watchers. */
export const userInfoWatchers = [takeLeading(userInfoActionCreators.fulfill.started.type, safeCall(userInfoWorkers.fulfill))];

//#endregion

//#region Selectors

/** User info selectors. */
export const UserInfoSelectors = {
    /** Returns user info branch from redux state.  */
    getBranch(state: IUserInfoReduxState): IUserInfoState {
        return state.userInfo;
    },
};

//#endregion
