import { RouterState } from 'connected-react-router';

import { AxiosRequestConfig } from 'axios';
import { ECheckErrorLevel, ECurrencyCode, EProcessStatus } from './enums';

/**
 * -----------------------------------
 * Front-End and Back-End models.
 * -----------------------------------
 */

/**
 * Interface that defines the common properties for error objects.
 */
export interface IError {
    /** Validation errors. */
    checks?: ICheckError[];

    /** Error code. */
    code?: string;

    /** HTTP error code. */
    httpCode?: number;

    /** Error flag. */
    error?: boolean;

    /** Error message. */
    message?: string;

    /** Error unique ID. */
    uuid?: string;
}

/**
 *  Validation error.
 */
export interface ICheckError {
    /** Error message. */
    message: string;

    /** Error path. */
    path?: string;

    /** Error level. */
    level?: ECheckErrorLevel;
}

/**
 * List.
 */
export interface IItems<TItem, TMeta = {}> {
    /** List of items. */
    data: TItem[];

    /** Meta data. */
    meta?: TMeta;
}

/**
 * Single item.
 */
export interface IItem<TItem, TMeta = {}> {
    /** Item. */
    data: TItem;

    /** Meta data. */
    meta?: TMeta;
}

/**
 * REST with pagination results.
 */
export interface IPaginatedItems<TItem> extends IItems<TItem> {
    /** Pagination. */
    pagination: IPagination;
}

/**
 * Pagination.
 */
export interface IPagination {
    /** Set count. */
    count?: number;

    /** Next page data existing flag. */
    hasNextPage?: boolean;

    /** Offset from beginning of the data. */
    offset?: number;
}

/**
 * Amount.
 */
export interface IAmount {
    /** Currency code. */
    currencyCode: ECurrencyCode;

    /** Amount value. */
    value: string;
}

/**
 * Range.
 */
export interface IRange<T> {
    /** Start range. */
    from: T;

    /** End range. */
    to: T;
}

/**
 * Entity.
 */
export interface IEntity {
    /** Identifier. */
    id: string;
}

/**
 * -----------------------------------
 * Front-End models.
 * -----------------------------------
 */

/**
 * Optional type.
 */
export type Optional<T> = T | undefined;

/**
 * Nullable type.
 */
export type Nullable<T> = T | null;

/**
 * Async loading data.
 */
export interface IAsyncData<T, M = any> {
    /** Data. */
    data?: T;

    /** Meta. */
    meta?: M;

    /** Error. */
    error?: IError;

    /** Data loading state. */
    status: EProcessStatus;
}

/**
 * List of items with paginations.
 */
export interface IPaginatedData<T> {
    /** List of items. */
    list: T[];

    /** Pagination. */
    pagination?: IPagination;
}

/**
 * Common Redux state.
 */
export interface ICommonReduxState {
    /** Router. */
    router?: RouterState;
}

/**
 * Interface for components that should wait for server response.
 */
export interface ILoadable {
    /** Is loading in process. */
    loading?: boolean;
}

/**
 * Form field model.
 */
export interface IFormField<T = void, TName = void> {
    /** Name. */
    name: TName extends void ? (T extends void ? TName : keyof T) : string;

    // TODO Fix 'any'.
    /** Label for a form field. */
    label?: any;

    // TODO Fix 'any'.
    /** Placeholder for a form field. */
    placeholder?: any;

    /** Options for a form fields with variations (RadioButtons in RadioGroup, CheckBoxes, etc.). */
    options?: any;
}

/**
 * Form field type.
 */
export type TFormField<T = void, TName = void> = { [key in keyof T]: IFormField<T, TName> } & { [key: string]: IFormField<T, TName> };

/**
 * Form field type value.
 */
export type TFormFieldValue<T = void> = { [key in keyof IFormField<T>['name']]?: any };

/**
 * Rest client model.
 */
export interface IRestClient {
    get: <TResponseData>(url: string, config?: AxiosRequestConfig) => Promise<TResponseData>;
    post: <TRequestData, TResponseData>(url: string, data?: TRequestData, config?: AxiosRequestConfig) => Promise<TResponseData>;
    put: <TRequestData, TResponseData>(url: string, data?: TRequestData, config?: AxiosRequestConfig) => Promise<TResponseData>;
    del: <TResponseData>(url: string, config?: AxiosRequestConfig) => Promise<TResponseData>;
}

/**
 * Model for file description.
 */
export interface IFileDescription {
    /** Id. */
    id: string;

    /** Name. */
    filename: string;

    /** Mimetype. */
    mimeType?: string;

    /** Size (B). */
    size: number;
}

/**
 * Model for progress indication.
 */
export interface IProgress {
    /** Data. */
    progress: number;
}
