import { api as sharedApi } from 'shared/api';

/**
 * Api endpoints.
 */
export const endpoints = {
    ...sharedApi.endpoints,

    /** Mock. */
    mock: {
        base: '/mock',
        info(id: string): string {
            return `${this.base}/info/${id}`;
        },
    },
};
