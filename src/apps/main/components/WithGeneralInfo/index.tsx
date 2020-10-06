import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';

import { ErrorBoundary } from 'components/ErrorBoundary';
import { useFetching } from 'utils/hooks/useFetch';
import { IUserInfo, IUserInfoState, userInfoActionCreators, UserInfoSelectors } from 'shared/redux/ducks/userInfo';
import { isInitial, isSuccess } from 'utils/redux';
import { IAsyncData } from 'models';
import { IInfo, MockActionCreators, MockSelectors } from '../../redux/ducks/mock';

import { IMainReduxState } from '../../redux/models';
import { UserContext } from './UserContext';

/** Component props from Application Redux state (connect). */
interface IStateProps {
    /** Info branch. */
    infoBranch: IAsyncData<IInfo>;

    /** User info branch. */
    userInfoBranch: IUserInfoState;
}

/**
 * Component dispatched actions.
 */
interface IDispatchProps {
    /** Fetch user profile general info. */
    getInfo: typeof MockActionCreators.getInfo.started;

    /** Fulfill. */
    fulfill: typeof userInfoActionCreators.fulfill.started;
}

/**
 * Component props.
 */
export interface IProps extends IDispatchProps, IStateProps, RouteComponentProps {}

/**
 * With GeneralInfo page.
 */
export const WithGeneralInfoComponent: React.FunctionComponent<IProps> = ({ children, fulfill, getInfo, userInfoBranch, infoBranch }) => {
    const { login = 'unknown' } = userInfoBranch.data || {};
    /** Fetch user information. */
    useEffect(() => {
        if (isSuccess(userInfoBranch) && isInitial(infoBranch)) {
            getInfo(login);
        }
    }, [userInfoBranch, infoBranch, getInfo]);

    return (
        <ErrorBoundary>
            <UserContext.Provider value={infoBranch}>{children}</UserContext.Provider>
        </ErrorBoundary>
    );
};

WithGeneralInfoComponent.displayName = 'WithGeneralInfo';

/** Connect to the Redux. */
const WithGeneralInfoConnected = withRouter<any, any>(
    connect<IStateProps, IDispatchProps, {}, IMainReduxState>(
        (appState: IMainReduxState) => ({
            infoBranch: MockSelectors.getInfo(appState),
            userInfoBranch: UserInfoSelectors.getBranch(appState),
        }),
        {
            fulfill: userInfoActionCreators.fulfill.started,
            getInfo: MockActionCreators.getInfo.started,
        },
    )(WithGeneralInfoComponent),
);

export { WithGeneralInfoConnected as WithGeneralInfo };
