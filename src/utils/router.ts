import { History, Location } from 'history';
import every from 'lodash/every';
import pathToRegexp from 'path-to-regexp';
import { generatePath, matchPath } from 'react-router';

/**
 * Transform a string into a valid path.
 */
export const makePath = (path: string, params: Object): string => pathToRegexp.compile(path)(params);

/**
 * Generate query params.
 */
export const createQuery = (params: Record<string, any>): string => new URLSearchParams(params).toString();

/**
 * React-Router generatePath wrapper with params checking.
 *
 * @param path {string} Path.
 * @param params {Object} Url params.
 *
 * @return {string} Path if all params exists or empty string.
 */
export const safeGeneratePath = (path: string, params?: any): string => {
    let resultPath: string;
    if (params) {
        resultPath = every(params, Boolean) ? generatePath(path, params) : '';
    } else {
        resultPath = generatePath(path);
    }
    return resultPath;
};

/**
 * History push wrapper with params checking.
 *
 * @param history {History} history object.
 * @param path {string} Path.
 * @param params {Object} Url params.
 *
 * @return {void} Push if every passed param not empty.
 */
export const safePush = (history: History<any>, path: string, params?: { [paramName: string]: string | number | boolean }): boolean | void =>
    every(params, Boolean) && history.push(safeGeneratePath(path, params));

/**
 * Check if passed path matches with current.
 *
 * @param location {Location} Location object.
 * @param path {string} Path to check.
 *
 * @return {boolean} Is passed path matches with current location path.
 */
export const isMatchPath = (location: Location<any>, path: string) => matchPath(location.pathname, { path, exact: true }) !== null;
