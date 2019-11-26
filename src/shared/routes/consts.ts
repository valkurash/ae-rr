/**
 * Shared routes names.
 */
export const SHARED_ROUTES = {
    LOG_OUT: {
        PATH: '/logout',
    },
    SUCCESS: {
        PATH: (prefix: string) => {
            return `${prefix}/success`;
        },
    },
};
