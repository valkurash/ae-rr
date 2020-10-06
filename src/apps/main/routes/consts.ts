import { SHARED_ROUTES } from 'shared/routes/consts';

/**
 * Main application routes names.
 */

export const ROUTES = {
    MAIN_PAGE: {
        PATH: '/',
    },
    PORTAL: {
        PATH: '/portal',
        INNER: { PATH: '/portal/inner' },
        CHAT: {
            PATH: '/portal/chat/:id',
        },
    },
    LOG_OUT: SHARED_ROUTES.LOG_OUT,
};
