import * as jwt from 'jsonwebtoken';
import { registerApplication, start } from 'single-spa';
import * as serviceWorker from './serviceWorker';

import { TOKEN_NAME } from './consts';
import { EApp, EUserRole } from './enums';
import i18n from './i18n';
import { IUserInfoPayload } from './shared/redux/ducks/userInfo';

const getRoleFromToken = (): string => {
    const token = localStorage.getItem(TOKEN_NAME) || '';
    const decoded: IUserInfoPayload = jwt.decode(token) as IUserInfoPayload;

    return (decoded && decoded.role) || '';
};

const role: string = getRoleFromToken();

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
    () => role === EUserRole.USER || role === EUserRole.ADMIN,
);

i18n.init.then(() => start());

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
