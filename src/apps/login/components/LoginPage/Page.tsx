import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { DEFAULT_PATH, TOKEN_NAME } from 'consts';
import { IAsyncData } from 'models';
import { isPending, isSuccess } from 'utils/redux';
import { redirect } from 'utils/rest';
import { ErrorBoundary } from 'components/ErrorBoundary';

import { AuthSelectors, ILoginServer, login } from '../../redux/ducks/auth';
import { ILoginReduxState } from '../../redux/models';

import { LoginForm } from '../LoginForm';

import './index.scss';

/** Component props depend on dispatch (from connect). */
interface IDispatchProps {
    /** Login. */
    authLogin: typeof login.started;
}

/** Component props from Application Redux state (connect). */
interface IStateProps {
    /** Login branch. */
    loginBranch: IAsyncData<ILoginServer>;
}

/** Component props. */
export interface IProps extends IDispatchProps, IStateProps {}

/** Login page. */
export const LoginPageComponent: React.FunctionComponent<IProps> = (props: IProps) => {
    const { authLogin, loginBranch } = props;
    const loading = isPending(loginBranch) || isSuccess(loginBranch);

    useEffect(() => {
        if (localStorage.getItem(TOKEN_NAME)) {
            redirect(DEFAULT_PATH);
        }
    }, []);

    return (
        <ErrorBoundary>
            <div className="login-panel">
                <LoginForm backendError={loginBranch.error} loading={loading} onSubmit={authLogin} />
            </div>
        </ErrorBoundary>
    );
};

LoginPageComponent.displayName = 'LoginPage';

const LoginPageConnected = connect<IStateProps, IDispatchProps, {}, ILoginReduxState>(
    (appState: ILoginReduxState) => ({
        loginBranch: AuthSelectors.getLoginInfo(appState),
    }),
    { authLogin: login.started },
)(LoginPageComponent);

export { LoginPageConnected as LoginPage };
