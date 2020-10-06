import * as jwt from 'jsonwebtoken';
import { registerApplication, start } from 'single-spa';
import * as serviceWorker from './serviceWorker';

import { TOKEN_NAME } from './consts';
import { EApp, EUserRole } from './enums';
import i18n from './i18n';
import { IUserInfoPayload } from './shared/redux/ducks/userInfo';

// TODO: Change when auth will be ready
const getRoleFromToken = (): string => {
    const token = localStorage.getItem(TOKEN_NAME) || '';
    const decoded: IUserInfoPayload = jwt.decode(token) as IUserInfoPayload;

    return (decoded && decoded.role) || '';
};

const role: string = getRoleFromToken();

i18n.init.then(() => {
    /**
     * Register Login app.
     */
    registerApplication(
        EApp.LOGIN,
        () => import('apps/login'),
        () => !role || !Object.values(EUserRole).includes(role as EUserRole),
    );
    /**
     * Register Admin app.
     */
    registerApplication(
        EApp.MAIN,
        () => import('apps/main'),
        () => role === EUserRole.SELLER || role === EUserRole.BUYER,
    );

    start();
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
