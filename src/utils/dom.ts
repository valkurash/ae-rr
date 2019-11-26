import { APP_DEFAULT_LANGUAGE, COOKIE_LANGUAGE_KEY } from 'consts';
import Cookies from 'js-cookie';

/**
 * Scroll element to specified position with specified duration.
 */
export const scrollTo = (element: HTMLElement, to: number, duration: number = 300): void => {
    if (duration <= 0) {
        element.scrollTop = to;
        return;
    }

    const difference = to - element.scrollTop;
    const perTick = (difference / duration) * 10;

    setTimeout(() => {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop === to) {
            return;
        }
        scrollTo(element, to, duration - 10);
    }, 10);
};

/**
 * Scroll element to top of wrapper.
 */
export const handleScrollTop = (baseElement: HTMLElement, wrapper: HTMLElement, baseDuration: number = 300): void => {
    const duration = !isNaN(baseDuration) ? baseDuration : 300;
    let element = baseElement;

    if (element && wrapper) {
        let offsetTop = 0;

        while (element) {
            offsetTop = offsetTop + element.offsetTop;
            element = element.offsetParent as HTMLElement;
        }

        scrollTo(wrapper, offsetTop, duration);
    }
};

/**
 * Gets current language from cookies and sets it as `html` tag's `lang` attribute value.
 */
export function setCurrentLanguageToHTMLAttribute(): void {
    const lang = Cookies.get(COOKIE_LANGUAGE_KEY) || APP_DEFAULT_LANGUAGE;
    document.getElementsByTagName('html')[0].setAttribute('lang', lang);
}
