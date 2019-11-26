import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Loading } from 'components/Loading';
import { LogoutRoutes } from 'shared/routes/logout';
import { PrivateRoute } from 'components/PrivateRoute';
import { Layout } from 'shared/components/Layout';
import { LayoutBody } from 'shared/components/Layout/LayoutBody';

import { ROUTES } from './consts';

const MainPage = lazy(() => import('../components/MainPage'));

/**
 * Main routes.
 */
export const Routes: JSX.Element = (
    <Switch>
        /** Logout routes. */
        {LogoutRoutes}
        /** Main routes. */
        <PrivateRoute
            render={() => (
                <Layout>
                    <LayoutBody>
                        <Suspense fallback={<Loading />}>
                            <Switch>
                                <Route render={() => <div>INNER</div>} path={ROUTES.PORTAL.INNER.PATH} />
                                <Route component={MainPage} path={ROUTES.PORTAL.PATH} />
                            </Switch>
                        </Suspense>
                    </LayoutBody>
                </Layout>
            )}
            path={ROUTES.PORTAL.PATH}
        />
        /** No route was found. */
        <Redirect to={ROUTES.PORTAL.PATH} />
    </Switch>
);
