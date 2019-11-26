import classnames from 'classnames';
import i18next from 'i18next';
import Cookies from 'js-cookie';
import React from 'react';

import { COOKIE_LANGUAGE_KEY } from 'consts';
import { ELanguage } from '../../enums';

import { EMode } from './enums';

import './index.scss';

/**
 * Component props.
 */
interface IProps {
    /** Mode. */
    mode?: EMode;
}

/**
 * MenuLang.
 */
export class MenuLang extends React.Component<IProps> {
    public static displayName: string = 'MenuLang';

    public componentDidMount(): void {
        this.setDefaultLangToCookie();
    }

    private setDefaultLangToCookie(): void {
        if (!Cookies.get(COOKIE_LANGUAGE_KEY)) {
            const defaultLang = i18next.languages[0];
            Cookies.set(COOKIE_LANGUAGE_KEY, defaultLang);
        }
    }

    private onClick(lang: string): void {
        i18next
            .changeLanguage(lang)
            .then(() => {
                Cookies.set(COOKIE_LANGUAGE_KEY, lang);
                window.location.reload();
            })
            .catch((err: any) => console.log(`Error in i18next changeLanguage method:  ${err}`));
    }

    public render(): JSX.Element {
        const { mode = EMode.LOGIN } = this.props;
        const currentLanguage = Cookies.get(COOKIE_LANGUAGE_KEY);

        return (
            <div
                className={classnames('menu-lang', {
                    'menu-lang--mode_main': mode === EMode.MAIN,
                    'menu-lang--mode_login': mode === EMode.LOGIN,
                })}
            >
                <button
                    className={classnames('menu-lang-btn', {
                        'menu-lang-btn--active': currentLanguage === ELanguage.EN,
                    })}
                    onClick={this.onClick.bind(null, ELanguage.EN)}
                >
                    {ELanguage.EN}
                </button>
                <button
                    className={classnames('menu-lang-btn', {
                        'menu-lang-btn--active': currentLanguage === ELanguage.RU,
                    })}
                    onClick={this.onClick.bind(null, ELanguage.RU)}
                >
                    {ELanguage.RU}
                </button>
            </div>
        );
    }
}
