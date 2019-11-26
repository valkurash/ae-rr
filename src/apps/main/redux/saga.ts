import { all } from 'redux-saga/effects';

import { authWatchers } from 'shared/redux/ducks/auth';
import { userInfoWatchers } from 'shared/redux/ducks/userInfo';

import { mockWatchers } from './ducks/mock';

export function* rootSaga(): IterableIterator<any> {
    yield all([...authWatchers, ...userInfoWatchers, ...mockWatchers]);
}
