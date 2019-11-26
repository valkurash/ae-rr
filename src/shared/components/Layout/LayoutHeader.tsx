import React from 'react';

/**
 * Component props.
 */
interface IProps {}

/**
 * LayoutHeader.
 */
export const LayoutHeader: React.FunctionComponent<IProps> = ({ children }) => (
    <div className="layout-header">
        <div className="layout-header__content">{children}</div>
    </div>
);
