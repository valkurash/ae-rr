import * as Cookies from 'js-cookie';

import { APP_DEFAULT_LANGUAGE, COOKIE_LANGUAGE_KEY } from 'consts';

import { ELanguage } from '../enums';

/**
 * Returns current lang of application.
 */
export const getCurrentLanguage = (): ELanguage => {
    return (Cookies.get(COOKIE_LANGUAGE_KEY) as ELanguage) || APP_DEFAULT_LANGUAGE;
};
