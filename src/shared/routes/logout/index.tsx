import React from 'react';
import { Route } from 'react-router';

import Logout from 'shared/components/Logout';

import { SHARED_ROUTES } from '../consts';

/**
 * Logout page route.
 */
export const LogoutRoutes = <Route component={Logout} path={SHARED_ROUTES.LOG_OUT.PATH} exact />;
