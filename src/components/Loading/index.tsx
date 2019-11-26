import React from 'react';

import './index.scss';

/**
 * Component props.
 */
interface IProps {}

/**
 * Loading component.
 */
export const Loading: React.FunctionComponent<IProps> = () => {
    return (
        <div className="lds-ring">
            <div />
            <div />
            <div />
            <div />
        </div>
    );
};
