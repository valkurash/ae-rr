import React from 'react';
import ReactLoadable from 'react-loadable';

import { LoadableLoading } from './LoadableLoading';

/**
 * Loadable options.
 */
interface ILoadableOptions {
    loader(): Promise<React.ComponentType<any> | { default: React.ComponentType<any> }>;
}

/**
 * Wrapper for React loadable.
 */
export const Loadable = (options: ILoadableOptions) =>
    ReactLoadable({
        ...options,
        loading: LoadableLoading,
    });
