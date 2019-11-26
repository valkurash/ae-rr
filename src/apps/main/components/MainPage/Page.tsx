import { useEffect } from 'react';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';

import { Loading } from 'components/Loading';
import { IAsyncData } from 'models';
import { isLoading, isInitial } from 'utils/redux';
import { translate } from 'utils/translation';
import { ErrorBoundary } from 'components/ErrorBoundary';

import { IInfo, MockActionCreators, MockSelectors } from '../../redux/ducks/mock';
import { IMainReduxState } from '../../redux/models';

/** Component props depend on dispatch (from connect). */
interface IDispatchProps {
    /** Login. */
    getInfo: typeof MockActionCreators.getInfo.started;
}

/** Component props from Application Redux state (connect). */
interface IStateProps {
    /** Info branch. */
    infoBranch: IAsyncData<IInfo>;
}

/** Component props. */
export interface IProps extends IDispatchProps, IStateProps, RouteComponentProps {}

/** Main page. */
export const MainPageComponent: React.FunctionComponent<IProps> = (props: IProps) => {
    const { getInfo, infoBranch } = props;
    const { data: info = { name: 'default' } } = infoBranch;
    const isInfoLoading = isLoading(infoBranch);

    /** Fetch info. */
    useEffect(() => {
        if (isInitial(infoBranch)) {
            getInfo();
        }
    }, [infoBranch, getInfo]);

    return (
        <ErrorBoundary>
            <div className="main-panel">
                {isInfoLoading ? (
                    <Loading />
                ) : (
                    <div>
                        {translate('Role.ROLE_USER')} {info.name}
                    </div>
                )}
            </div>
        </ErrorBoundary>
    );
};

MainPageComponent.displayName = 'MainPage';

const MainPageConnected = withRouter(
    connect<IStateProps, IDispatchProps, {}, IMainReduxState>(
        (appState: IMainReduxState) => ({
            infoBranch: MockSelectors.getInfo(appState),
        }),
        {
            getInfo: MockActionCreators.getInfo.started,
        },
    )(MainPageComponent),
);

export { MainPageConnected as MainPage };
