import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';

import { ROUTES } from 'apps/main/routes/consts';
import { MenuLang } from 'components/MenuLang';
import { EMode } from 'components/MenuLang/enums';
import { authActionCreators } from 'shared/redux/ducks/auth';

import './index.scss';

/** Menu item interface. */
interface IMenuItem {
    href: string;
    isExact: boolean;
    label: string;
    iconName?: any;
}

/**
 * Component props depend on dispatch (from connect).
 */
interface IDispatchProps {
    /** Logout. */
    authLogout: typeof authActionCreators.logout.started;
}

/**
 * Component props.
 */
export interface IProps extends IDispatchProps, RouteComponentProps {}

/** Layout. */
export const LayoutComponent: React.FunctionComponent<IProps> = ({ children, history, authLogout }) => {
    const handleLogOut = (): void => {
        authLogout();
    };

    /**
     * Render layout aside.
     */
    const renderAside = () => {
        const menuItems: IMenuItem[] = [
            {
                href: ROUTES.PORTAL.INNER.PATH,
                isExact: true,
                label: 'Link',
            },
        ];

        return (
            <div className="layout__aside">
                <div className="layout-nav">
                    {menuItems.map(item => (
                        <NavLink key={item.href} exact={item.isExact} to={item.href} className="btn-aside-nav">
                            {item.label}
                        </NavLink>
                    ))}
                </div>

                <MenuLang mode={EMode.MAIN} />

                <button className="layout-logout logout-btn" onClick={handleLogOut}>
                    X
                </button>
            </div>
        );
    };

    return (
        <div className="layout" data-test-id="layout">
            {renderAside()}
            <div className="layout__content">{children}</div>
        </div>
    );
};

export const Layout = withRouter(
    connect<null, IDispatchProps>(null, {
        authLogout: authActionCreators.logout.started,
    })(LayoutComponent),
);
