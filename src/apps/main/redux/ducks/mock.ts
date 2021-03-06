/**
 * @file Mock.
 */

import { combineReducers } from 'redux';
import { SagaIterator } from 'redux-saga';
import { call, takeLeading } from 'redux-saga/effects';
import actionCreatorFactory from 'typescript-fsa';
import { bindAsyncAction } from 'typescript-fsa-redux-saga';

import { IAsyncData, IError, IItem } from 'models';
import { asyncReducerGen, getInitialAsyncData, safeCall } from 'utils/redux';
import { RestClient } from 'utils/rest';

import { API } from '../../api';
import { IMainReduxState } from '../models';
import { getDuckActionNamespace } from '../utils';

const reducerName = 'mock';

//#region Models

/** Info model. */
export interface IInfo {
    /** Data. */
    name: string;

    /** Chat list. */
    chats: string[];
}

/** New customer Redux state. */
export interface IMockReduxState {
    /** Info branch. */
    info: IAsyncData<IInfo>;
}

/** Response format for info REST method. */
export interface IInfoRs extends IItem<IInfo> {}

//#endregion

//#region Action Creators

/** Mock action creator factory. */
const actionCreator = actionCreatorFactory(getDuckActionNamespace(reducerName));

/** Mock action creators. */
export const MockActionCreators = {
    /** Fetch info. */
    getInfo: actionCreator.async<string, IInfoRs, IError>('GET_INFO'),
};

//#endregion.

//#region Reducer

/** New customer reducer initial state. */
export const initialState: IMockReduxState = {
    info: getInitialAsyncData<IInfo>(),
};

/** New customer reducer. */
export default combineReducers<IMockReduxState>({
    info: asyncReducerGen<string, IInfo>(MockActionCreators.getInfo),
});

//#endregion.

//#region Services

const restClient = new RestClient();

/** Mock services. */
export const MockServices = {
    /** Get info method. */
    getInfo(id: string): Promise<IInfoRs> {
        return restClient.get<IInfoRs>(API.endpoints.mock.info(id));
    },
};

//#endregion

//#region Sagas

/** Get mock info saga worker. */
const getMockInfoWorker = bindAsyncAction(MockActionCreators.getInfo, { skipStartedAction: true })(function*(params: string): SagaIterator {
    return yield call(MockServices.getInfo, params);
});

/** New Customer saga. */
export const mockWatchers = [takeLeading(MockActionCreators.getInfo.started.type, safeCall(getMockInfoWorker))];

//#endregion

//#region Selectors

/** New customer selectors. */
export const MockSelectors = {
    /** Returns mock branch from redux state.  */
    getBranch(state: IMainReduxState): IMockReduxState {
        return state.mock;
    },

    /** Returns info.  */
    getInfo(state: IMainReduxState): IAsyncData<IInfo> {
        return this.getBranch(state).info;
    },
};

//#endregion
