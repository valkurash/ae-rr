/**
 * Auth Api definition.
 */
export const API = {
    base: '/auth',
    get login(): string {
        return `${this.base}/login`;
    },
};
