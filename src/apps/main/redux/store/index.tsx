import { connectRouter, routerMiddleware } from 'connected-react-router';
import { History } from 'history';
import { applyMiddleware, combineReducers, createStore, Reducer, ReducersMapObject } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { composeEnhancers } from 'utils/redux';
import UserInfoReducer, { initialState as userInfoInitialState } from 'shared/redux/ducks/userInfo';

import { IMainReduxState } from '../models';
import MockReducer, { initialState as mockInitialState } from '../ducks/mock';
import { rootSaga } from '../saga';

/**
 * Login application initial redux store state.
 */
const setMainInitialReduxState = (): IMainReduxState => {
    return {
        mock: mockInitialState,
        userInfo: userInfoInitialState,
    };
};

/**
 * Login application redux store initialization.
 */
export const initStore = (history: History) => {
    const reducersList: ReducersMapObject<IMainReduxState> = {
        mock: MockReducer,
        userInfo: UserInfoReducer as Reducer<any>,
        router: connectRouter(history) as Reducer<any>,
    };
    const appReducers = combineReducers<IMainReduxState>(reducersList);
    const reactRouterMiddleware = routerMiddleware(history);
    const sagaMiddleware = createSagaMiddleware();
    const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware, reactRouterMiddleware));

    const store = createStore(appReducers, setMainInitialReduxState(), enhancer);

    sagaMiddleware.run(rootSaga);

    return store;
};
