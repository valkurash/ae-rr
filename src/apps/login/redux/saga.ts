import { all } from 'redux-saga/effects';

import { authLoginSagaWatcher } from '../redux/ducks/auth';

export function* rootSaga(): IterableIterator<any> {
    yield all([...authLoginSagaWatcher]);
}
