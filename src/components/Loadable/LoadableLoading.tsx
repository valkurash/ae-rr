import React from 'react';

import { LoadingComponentProps } from 'react-loadable';

import { Loading } from '../Loading';

/**
 * Loading component for Loadable.
 */
export const LoadableLoading: React.FunctionComponent<LoadingComponentProps> = ({ pastDelay }) => {
    let content = null;

    if (pastDelay) {
        // When the loader has taken longer than the delay
        content = <Loading />;
    }

    return content;
};
