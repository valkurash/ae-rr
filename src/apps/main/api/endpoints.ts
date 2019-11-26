import { api as sharedApi } from 'shared/api';

/**
 * Api endpoints.
 */
export const endpoints = {
    ...sharedApi.endpoints,

    /** Mock. */
    mock: {
        base: '/mock',
        get info(): string {
            return `${this.base}/info`;
        },
    },
};
