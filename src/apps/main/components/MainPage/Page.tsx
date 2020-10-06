import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import { Loading } from 'components/Loading';
import { NavLink } from 'react-router-dom';
import { isLoading } from 'utils/redux';
import { translate } from 'utils/translation';
import { ErrorBoundary } from 'components/ErrorBoundary';

import { useUserContext } from '../WithGeneralInfo/UserContext';

/** Component props depend on dispatch (from connect). */
interface IDispatchProps {}

/** Component props from Application Redux state (connect). */
interface IStateProps {}

/** Component props. */
export interface IProps extends IDispatchProps, IStateProps, RouteComponentProps {}

/** Main page. */
export const MainPageComponent: React.FunctionComponent<IProps> = (props: IProps) => {
    const infoBranch = useUserContext();
    const { data: info = { name: 'default', chats: [] } } = infoBranch;
    const isInfoLoading = isLoading(infoBranch);

    return (
        <ErrorBoundary>
            <div className="main-panel">
                {isInfoLoading ? (
                    <Loading />
                ) : (
                    <div>
                        <div>
                            {translate('Role.ROLE_USER')} {info.name}
                        </div>
                        <div>
                            {info.chats &&
                                info.chats.map(c => (
                                    <div key={c}>
                                        <NavLink exact={true} to={`/portal/chat/${c}`}>
                                            {c}
                                        </NavLink>
                                    </div>
                                ))}
                        </div>
                    </div>
                )}
            </div>
        </ErrorBoundary>
    );
};

MainPageComponent.displayName = 'MainPage';

const MainPageConnected = withRouter(MainPageComponent);

export { MainPageConnected as MainPage };
