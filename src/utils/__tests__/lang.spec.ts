import Cookies from 'js-cookie';

import { APP_DEFAULT_LANGUAGE, COOKIE_LANGUAGE_KEY } from 'consts';

import { ELanguage } from '../../enums';

import { getCurrentLanguage } from '../lang';

describe('lang', () => {
    describe('getCurrentLanguage', () => {
        it('should return default app language', () => {
            expect(getCurrentLanguage()).toBe(APP_DEFAULT_LANGUAGE);
        });

        it('should return RU lang', () => {
            Cookies.set(COOKIE_LANGUAGE_KEY, ELanguage.RU);

            expect(getCurrentLanguage()).toBe(ELanguage.RU);
        });
    });
});
