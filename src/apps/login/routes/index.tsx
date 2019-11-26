import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Loading } from 'components/Loading';

import { LOGIN_ROUTES } from './consts';

const LoginPage = lazy(() => import('../components/LoginPage'));

/**
 * Login routes.
 */
export const Routes: JSX.Element = (
    <Suspense fallback={<Loading />}>
        <Switch>
            <Route component={LoginPage} exact key={LOGIN_ROUTES.MAIN_PAGE.PATH} path={LOGIN_ROUTES.MAIN_PAGE.PATH} />
            <Redirect to={LOGIN_ROUTES.MAIN_PAGE.PATH} />
        </Switch>
    </Suspense>
);
