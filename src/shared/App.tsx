import 'globals';
import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';

import { userInfoActionCreators } from 'shared/redux/ducks/userInfo';

/**
 * Component dispatched actions.
 */
interface IDispatchProps {
    /** Fulfill user info. */
    fulfillUserInfo: typeof userInfoActionCreators.fulfill.started;
}

/**
 * Component props.
 */
interface IProps extends IDispatchProps, RouteComponentProps {}

/**
 * Application.
 */
class AppComponent extends React.Component<IProps> {
    public componentDidMount(): void {
        this.props.fulfillUserInfo();
    }

    public render(): JSX.Element {
        return <>{this.props.children}</>;
    }
}

const App = withRouter<any, any>(
    connect<void, IDispatchProps>(null, {
        fulfillUserInfo: userInfoActionCreators.fulfill.started,
    })(AppComponent),
);

export default App;
