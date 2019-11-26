import React from 'react';

/**
 * Components props.
 */
export interface IProps {}

/**
 * LayoutBody.
 */
const LayoutBody: React.FunctionComponent<IProps> = ({ children }) => (
    <div className="layout__content-body">
        <div className="layout__content-body-row">{children}</div>
    </div>
);

LayoutBody.displayName = 'LayoutBody';

export { LayoutBody };
