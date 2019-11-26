import classnames from 'classnames';
import React from 'react';

/**
 * Component props.
 */
interface IProps {
    /** Supporting top content. */
    topContent?: JSX.Element[] | JSX.Element;

    /** Column position center. */
    center?: boolean;

    /** Main content. */
    children: JSX.Element[] | JSX.Element;
}

/**
 * LayoutBodyMain.
 */
const LayoutBodyMain: React.FunctionComponent<IProps> = ({ children, topContent, center }) => (
    <div
        className={classnames('layout__content-body--main', {
            'layout__content-body--main--center': center,
        })}
    >
        {topContent}
        <div>{children}</div>
    </div>
);

LayoutBodyMain.displayName = 'LayoutBodyMain';

export { LayoutBodyMain };
