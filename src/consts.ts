import { AxiosRequestConfig } from 'axios';

import { ELanguage } from './enums';

/**
 * Language cookie key.
 */
export const COOKIE_LANGUAGE_KEY = 'lang';

/**
 * Default language.
 */
export const APP_DEFAULT_LANGUAGE = ELanguage.RU;

/**
 * Common REST configuration.
 */
export const defaultCacheConfig = {
    frequentlyChanged: {
        maxAge: 60 * 1000, // 1 min
    },
    infrequentlyChanged: {
        maxAge: 60 * 60 * 1000, // 1 hour
    },
    prefix: 'kb',
};

/**
 * Common REST configuration.
 */
export const commonRestConfig: AxiosRequestConfig = {
    baseURL: '/api',
    timeout: 60000,
};

/** Default application path. */
export const DEFAULT_PATH = '/';

/** Full screen loading page location. */
export const LOADING_PAGE_PATH = '/loading.html';

/** Token refresh path. */
export const TOKEN_REFRESH_PATH = '/auth/refresh';

/** Refresh token  name. */
export const TOKEN_REFRESH_NAME = 'refreshToken';

/** Error class name. */
export const ERROR_CLASS_NAME = 'elementWithError';

/** Session token name. */
export const TOKEN_NAME = 'accessToken';

/** User inactivity timeout. */
export const INACTIVITY_TIMEOUT_MS = 300000;

/** Default date format. */
export const DATE_FORMAT = 'DD.MM.YYYY';

/** Time format without seconds. */
export const TIME_FORMAT_HH_MM = 'hh:mm';

/** Polling interval */
export const POLLING_INTERVAL = 5000;
