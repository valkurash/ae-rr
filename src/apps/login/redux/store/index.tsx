import { connectRouter, routerMiddleware } from 'connected-react-router';
import { History } from 'history';
import { applyMiddleware, combineReducers, createStore, Reducer, ReducersMapObject } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { composeEnhancers } from 'utils/redux';
import { ILoginReduxState } from '../models';

import AuthReducers, { authInitialState } from '../ducks/auth';
import { rootSaga } from '../saga';

/**
 * Login application initial redux store state.
 */
const setLoginInitialReduxState = (): ILoginReduxState => {
    return {
        auth: authInitialState,
    };
};

/**
 * Login application redux store initialization.
 */
export const initStore = (history: History) => {
    const reducersList: ReducersMapObject = {
        auth: AuthReducers,
        router: connectRouter(history) as Reducer<any>,
    };
    const appReducers = combineReducers<ILoginReduxState>(reducersList);
    const reactRouterMiddleware = routerMiddleware(history);
    const sagaMiddleware = createSagaMiddleware();
    const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware, reactRouterMiddleware));

    const store = createStore(appReducers, setLoginInitialReduxState(), enhancer);

    sagaMiddleware.run(rootSaga);

    return store;
};
