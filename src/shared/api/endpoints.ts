/**
 * Api endpoints.
 */
export const endpoints = {
    /** Auth. */
    auth: {
        base: '/auth',
        get logout(): string {
            return `${this.base}/logoff`;
        },
    },

    /** Dictionaries. */
    dictionaries: {
        base: '/dictionaries',
    },
};
