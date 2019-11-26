import { ICommonReduxState } from 'models';

import { IAuthReduxState } from './ducks/auth';

/**
 * Login application redux state model.
 */
export interface ILoginReduxState extends ICommonReduxState {
    auth: IAuthReduxState;
}
