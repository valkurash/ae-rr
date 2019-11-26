import i18n, { InitOptions } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import XHR from 'i18next-xhr-backend';
import moment from 'moment';
import { initReactI18next } from 'react-i18next';

import { APP_DEFAULT_LANGUAGE, COOKIE_LANGUAGE_KEY, DATE_FORMAT } from 'consts';

import { ELanguage } from './enums';

/**
 * Translation (i18next) configuration.
 */
const translationConfig: InitOptions = {
    appendNamespaceToMissingKey: true,
    backend: {
        loadPath: '/nls/{{lng}}/{{ns}}.json',
    },
    contextSeparator: '#',
    debug: false,
    defaultNS: 'Common',
    detection: {
        lookupCookie: COOKIE_LANGUAGE_KEY,
    },
    fallbackLng: APP_DEFAULT_LANGUAGE,
    interpolation: {
        escapeValue: false,
        format(value: any, format?: string): string {
            if (format === 'uppercase') {
                return value.toUpperCase();
            }
            if (format === 'fromIso') {
                return moment(value).format(DATE_FORMAT);
            }
            return value;
        },
    },
    keySeparator: '.',
    load: 'all',
    ns: ['Common', 'Login'],
    nsSeparator: ':',
    pluralSeparator: '-',
    whitelist: [ELanguage.EN, ELanguage.RU],
};

/**
 * Initialize i18next.
 */
const init = i18n
    .use(XHR)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init(translationConfig);

export default { init };
