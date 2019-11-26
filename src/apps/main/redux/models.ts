import { ICommonReduxState } from 'models';
import { IUserInfoReduxState } from 'shared/redux/ducks/userInfo';

import { IMockReduxState } from './ducks/mock';

/**
 * Common redux state model.
 */
type TCommonReduxState = ICommonReduxState & IUserInfoReduxState;

/**
 * Main application redux state model.
 */
export interface IMainReduxState extends TCommonReduxState {
    mock: IMockReduxState;
}
