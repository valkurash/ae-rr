import { Href, Location, UnregisterCallback } from 'history';
import isObject from 'lodash/isObject';
import { RouteComponentProps } from 'react-router';
import { ActionCreator, AsyncActionCreators, Failure, Success } from 'typescript-fsa';

import { EProcessStatus } from 'enums';
import { FormikProps } from 'formik';
import { IAsyncData, IError, IItem } from 'models';
import { getInitialAsyncData } from 'utils/redux';

export function isSimilar(orig: any, testing: any): boolean {
    return Object.keys(orig).every((key: any) => {
        let result = false;

        if (key in testing) {
            const testValue = testing[key];

            result = isObject(testValue) ? isSimilar(orig[key], testValue) : testValue === orig[key];
        }

        return result;
    });
}

export const isSimilarArrays = (orig: any[], testing: any[]) => orig.every((item, key) => isSimilar(item, testing[key]));

/**
 * Success mock.
 */
const successPayloadMock: Success<any, IItem<any>> = {
    result: { data: 'test' },
};

/**
 * Error mock.
 */
export const errorPayloadMock: Failure<any, IError> = {
    error: {
        code: 'FORBIDDEN',
        message: 'Some error',
        uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    },
};

/**
 * Testing standard reducer with asynchronous data - pending status.
 */
function testAsyncReducerPendingStatus(reducer: Function, actionType: string): void {
    it('handles pending status', () => {
        const incomingAction = { type: actionType };
        const expectedStoreChange = { status: EProcessStatus.PENDING };
        expect(reducer(undefined, incomingAction)).toEqual(jasmine.objectContaining(expectedStoreChange));
        expect(reducer(expectedStoreChange, incomingAction)).toEqual(jasmine.objectContaining(expectedStoreChange));
    });
}

/**
 * Testing standard reducer with asynchronous data - error status.
 */
function testAsyncReducerErrorStatus(reducer: Function, actionType: string, errorPayload: Failure<any, IError>): void {
    it('handles error status', () => {
        const incomingAction = { type: actionType, payload: errorPayload };
        const expectedStoreChange = { status: EProcessStatus.ERROR, error: errorPayload.error };
        expect(reducer(undefined, incomingAction)).toEqual(jasmine.objectContaining(expectedStoreChange));
        expect(reducer(expectedStoreChange, incomingAction)).toEqual(jasmine.objectContaining(expectedStoreChange));
    });
}

/**
 * Testing standard reducer with asynchronous data - unknown action.
 */
function testAsyncReducerUnknownAction(reducer: Function, initialStore: any): void {
    it("store doesn't changed with an unknown action", () => {
        const incomingAction = { type: 'SOME_MAD_ACTION_TYPE_THAT_DOES_NOT_EXIST' };
        expect(reducer(undefined, incomingAction)).toEqual(initialStore);
        expect(reducer(initialStore, incomingAction)).toEqual(initialStore);
    });
}

/**
 * Testing standard reducer with asynchronous data - success status.
 */
function testAsyncReducerSuccessStatus(reducer: Function, actionType: string, successPayload: Success<any, IItem<any>>): void {
    it('handles success status', () => {
        const incomingAction = { type: actionType, payload: successPayload };
        const expectedStoreChange = { status: EProcessStatus.SUCCESS, data: successPayload.result.data };
        expect(reducer(undefined, incomingAction)).toEqual(jasmine.objectContaining(expectedStoreChange));
        expect(reducer(expectedStoreChange, incomingAction)).toEqual(jasmine.objectContaining(expectedStoreChange));
    });
}

/**
 * Testing standard reducer with asynchronous data.
 *
 * @param {Function} reducer Tested reducer.
 * @param {string} actionCreator Action creator.
 * @param {IItem<any>} successPayload Success payload example.
 * @param {IError} errorPayload Error payload example.
 */
export function testAsyncReducer(
    reducer: Function,
    actionCreator: AsyncActionCreators<any, any>,
    successPayload: Success<any, IItem<any>> = successPayloadMock,
    errorPayload: Failure<any, IError> = errorPayloadMock,
): void {
    describe(`Action ${actionCreator.type}`, () => {
        testAsyncReducerSuccessStatus(reducer, actionCreator.done.type, successPayload);
        testAsyncReducerUnknownAction(reducer, getInitialAsyncData());
        testAsyncReducerPendingStatus(reducer, actionCreator.started.type);
        testAsyncReducerErrorStatus(reducer, actionCreator.failed.type, errorPayload);
    });
}

/**
 * Testing standard reducer with synchronous data.
 */
export function testReducer(reducer: Function, actionCreator: ActionCreator<any>, payload: any): void {
    it('handles synchronous reducer action', () => {
        const incomingAction = { type: actionCreator.type, payload };
        const expectation = isObject(payload) ? jasmine.objectContaining(payload) : payload;
        expect(reducer(undefined, incomingAction)).toEqual(expectation);
        expect(reducer(payload, incomingAction)).toEqual(expectation);
    });
}

/**
 * Mock data for different status.
 */
export const asyncDataMock = {
    idle(): IAsyncData<any> {
        return { data: null, status: EProcessStatus.IDLE };
    },
    pending(data: any = null): IAsyncData<any> {
        return { data, status: EProcessStatus.PENDING };
    },
    error(
        error: IError = {
            code: 'Bad Gateway',
            httpCode: 502,
            message: 'Bad gateway.',
        },
    ): IAsyncData<any> {
        return { data: null, error, status: EProcessStatus.ERROR };
    },
    success(data: any = {}): IAsyncData<any> {
        return { data, status: EProcessStatus.SUCCESS };
    },
};

/**
 * Mock react-router RouteComponentProps object.
 */
export function getRouteComponentPropsMock<P>(data?: P, location: Partial<Location> = {}): RouteComponentProps<P> {
    const mergedLocation = {
        hash: '',
        key: '',
        pathname: '',
        search: '',
        state: {},
        ...location,
    };

    return {
        match: {
            isExact: true,
            params: data as P,
            path: '',
            url: '',
        },
        location: mergedLocation,
        history: {
            length: 2,
            action: 'POP',
            location: mergedLocation,
            push: jest.fn(),
            replace: jest.fn(),
            go: jest.fn(),
            goBack: jest.fn(),
            goForward: jest.fn(),
            block: (): UnregisterCallback => null as any,
            createHref: (): Href => '',
            listen: (): UnregisterCallback => null as any,
        },
        staticContext: {},
    };
}

/**
 * Mock formikProps object.
 */
export function formikProps<P>(data?: P): FormikProps<P> {
    return {
        values: data as P,
        errors: null as any,
        touched: null as any,
        isSubmitting: false,
        isValidating: false,
        submitCount: 0,
        dirty: false,
        getFieldMeta: jest.fn(),
        getFieldProps: jest.fn(),
        isValid: true,
        initialValues: null as any,
        initialErrors: null as any,
        initialTouched: null as any,
        handleSubmit: jest.fn(),
        handleChange: jest.fn(),
        handleBlur: jest.fn(),
        setFieldValue: jest.fn(),
        setFieldError: jest.fn(),
        setFieldTouched: jest.fn(),
        setFormikState: jest.fn(),
        handleReset: jest.fn(),
        setStatus: jest.fn(),
        setValues: jest.fn(),
        setErrors: jest.fn(),
        setSubmitting: jest.fn(),
        setTouched: jest.fn(),
        validateForm: jest.fn(),
        submitForm: jest.fn(),
        resetForm: jest.fn(),
        validateField: jest.fn(),
        registerField: jest.fn(),
        unregisterField: jest.fn(),
    };
}

/**
 * Return form elements value.
 */
export function formElementValue(wrapper: any, testElementId: string): any {
    return wrapper.find(`[dataTestId="${testElementId}"]`).prop('value');
}

export const currentEventLoopEnd = () => new Promise(resolve => setImmediate(resolve));
