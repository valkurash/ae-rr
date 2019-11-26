import isArray from 'lodash/isArray';
import isFunction from 'lodash/isFunction';
import { compose } from 'redux';
import { SagaIterator } from 'redux-saga';
import { call } from 'redux-saga/effects';
import { Action, AsyncActionCreators, Failure, Success } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { EProcessStatus } from 'enums';
import { IAsyncData, IError, IItem } from 'models';

/**
 * Success payload type.
 */
export type TSuccessPayload<P, T, M = any> = Success<P, IItem<T, M>>;

/**
 * Failure payload type.
 */
export type TFailurePayload<P> = Failure<P, IError>;

/**
 * Async action Payload type.
 */
export type TAsyncActionPayload<P, T, M = any> = TSuccessPayload<P, T, M> | TFailurePayload<P>;

/**
 * Action payload type.
 */
export type TActionPayload<P, T, M = any> = P | TAsyncActionPayload<P, T, M>;

/**
 * Action type.
 */
export type TAction<P, T, M = any> = Action<TActionPayload<P, T, M>>;

/**
 * Get async data branch.
 *
 * @param data {T} Entity data.
 * @param meta {M} Meta information about entity.
 * @param error {Error} Error object.
 * @param status {EProcessStatus} Current branch status.
 */
export const getAsyncData = <T, M = any>(data?: T, meta?: M, error?: Error, status: EProcessStatus = EProcessStatus.IDLE): IAsyncData<T, M> => ({
    data,
    meta,
    error,
    status,
});

/**
 * Initial async data.
 */
export const getInitialAsyncData = <T, M = any>(initialData?: T, initialMeta?: M): IAsyncData<T, M> => getAsyncData(initialData, initialMeta);

/**
 * Async reducers handler type.
 */
type TAsyncReducerHandlers<P, T, M> = {
    started: (state: IAsyncData<T>, payload: P) => IAsyncData<T>;
    done: (state: IAsyncData<T>, payload: Success<P, IItem<T>>) => IAsyncData<T>;
    failed: (state: IAsyncData<T>, payload: Failure<P, IError>) => IAsyncData<T>;
};

/**
 * Async default handlers.
 */
export function asyncDefaultHandlers<P, T, M = any>(): TAsyncReducerHandlers<P, T, M> {
    return {
        started: state => ({
            ...state,
            status: EProcessStatus.PENDING,
        }),
        done: (state, payload) => {
            const result = payload.result;
            const { data, meta } = result || ({} as typeof result);
            return {
                data,
                meta,
                error: undefined,
                status: EProcessStatus.SUCCESS,
            };
        },
        failed: (state, payload) => ({
            ...state,
            error: payload.error,
            status: EProcessStatus.ERROR,
        }),
    };
}

/**
 * Standard reducers generator for asynchronous data.
 *
 * @param asyncActionCreator Base action creator.
 * @param initialData
 * @param initialMeta
 * @param {P} [payloadData] Payload data.
 * @param {T} [responseData] Response data.
 * @param {M} [responseMeta] Response meta.
 */
export function asyncReducerGen<P, T, M = any>(
    asyncActionCreator: AsyncActionCreators<P, IItem<T, M>, IError>,
    initialData?: T,
    initialMeta?: M,
): (store: IAsyncData<T, M> | undefined, action: TAction<P, T, M>) => IAsyncData<T, M> {
    const handler = asyncDefaultHandlers<P, T>();
    return reducerWithInitialState<IAsyncData<T, M>>(getInitialAsyncData<T>(initialData as T, initialMeta))
        .case(asyncActionCreator.started, handler.started)
        .case(asyncActionCreator.done, handler.done)
        .case(asyncActionCreator.failed, handler.failed);
}

/**
 * Return list of AsyncData elements from array.
 *
 * @param {T[]} array data.
 * @param {EProcessStatus} [status] item states.
 */
export function getAsyncArray<T>(array: T[], status: EProcessStatus = getInitialAsyncData().status): IAsyncData<T>[] {
    let asyncArray: IAsyncData<T>[] = [];

    if (isArray(array)) {
        asyncArray = array.map((data: T) => ({
            ...getInitialAsyncData(),
            data,
            status,
        }));
    }

    return asyncArray;
}

//#region Statuses

export const isInitial = (data: IAsyncData<any>) => data.status === EProcessStatus.IDLE;

export const isLoading = (data: IAsyncData<any>) => data.status === EProcessStatus.PENDING || data.status === EProcessStatus.IDLE;

export const isPending = (data: IAsyncData<any>) => data.status === EProcessStatus.PENDING;

export const isSuccess = (data: IAsyncData<any>) => data.status === EProcessStatus.SUCCESS;

export const isError = (data: IAsyncData<any>) => data.status === EProcessStatus.ERROR;

export const isValidationError = (data: IAsyncData<any>) =>
    data.status === EProcessStatus.ERROR && data.error && Array.isArray(data.error.checks) && Boolean(data.error.checks);

export const isInitialLoading = (data: IAsyncData<any>) => isLoading(data) && data.data === null;

export const isInitialPending = (data: IAsyncData<any>) => isPending(data) && data.data === null;

//#endregion.

//#region Redux-Saga

/**
 * HOC to swallows saga exceptions which are handled in reducers.
 */
export function safeCall<P>(worker: (params: P, ...args: any[]) => SagaIterator): any {
    return function*(action: Action<P>): SagaIterator {
        try {
            yield call(worker, action.payload);
        } catch (e) {
            console.log(e);
        } finally {
            // Tell Formik that submitting is done.
            if (action.meta && isFunction(action.meta.setSubmitting)) {
                action.meta.setSubmitting(false);
            }
        }
    };
}

/**
 * HOC to return Success Action payload data.
 */
export function successPayload<P, T>(worker: (data: T) => SagaIterator): any {
    return function*(action: Action<Success<P, IItem<T>>>): SagaIterator {
        try {
            yield call(worker as any, action.payload.result ? action.payload.result.data : null);
        } catch (e) {
            console.log(e);
        }
    };
}

/**
 * HOC to return Success Action data.
 */
export function successAction<P, T>(worker: (data: Action<Success<P, IItem<T>>>) => SagaIterator): any {
    return function*(action: Action<Success<P, IItem<T>>>): SagaIterator {
        try {
            yield call(worker, action);
        } catch (e) {
            console.log(e);
        }
    };
}

/**
 * HOC to return Error Action payload data.
 */
export function errorPayload<P>(worker: (data: IError) => SagaIterator): any {
    return function*(action: Action<Failure<P, IError>>): SagaIterator {
        try {
            yield call(worker, action.payload.error);
        } catch (e) {
            console.log(e);
        }
    };
}

//#endregion.

/**
 * It needs for redux-devtool extension supporting.
 * @link https://github.com/zalmoxisus/redux-devtools-extension#usage
 */
export const composeEnhancers = !(typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
    ? compose
    : (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      });
