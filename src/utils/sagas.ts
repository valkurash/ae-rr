import startsWith from 'lodash/startsWith';
import { SagaIterator } from 'redux-saga';
import { call } from 'redux-saga/effects';

import { LOADING_PAGE_PATH } from 'consts';

/**
 * Download file saga.
 *
 * @param downloadFn Download function.
 * @param params Download function params.
 */
export function* downloadFile<T = void, P = any>(downloadFn: (...params: P[]) => Promise<T>, ...params: P[]): SagaIterator {
    const downloadWindow = window.open(LOADING_PAGE_PATH) as Window;
    try {
        const response = yield call(downloadFn, ...params);
        const blob = new Blob([response], { type: response.type });
        downloadWindow.location.replace(window.URL.createObjectURL(blob));
        if (response.type !== 'application/pdf' && !startsWith(response.type, 'image/')) {
            downloadWindow.close();
        }
        // TODO: Refactor this workaround.
        return { data: null };
    } catch (error) {
        downloadWindow.close();
        throw error;
    }
}
