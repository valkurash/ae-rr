import React, { useContext } from 'react';

import { IAsyncData } from 'models';
import { IInfo } from '../../redux/ducks/mock';

/** Context to provide user info. */
export const UserContext = React.createContext<IAsyncData<IInfo>>({} as IAsyncData<IInfo>);

/** User context user react hook. */
export const useUserContext = () => useContext(UserContext);

export default UserContext;
