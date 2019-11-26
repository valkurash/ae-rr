import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory, History } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';

import App from 'shared/App';
import { setCurrentLanguageToHTMLAttribute } from 'utils/dom';
import { logError } from 'utils/error';

import './styles/fonts.scss';
import './styles/normalize.scss';
import './index.scss';

/**
 * Root application factory.
 *
 * @param initStore {Function} Function for the redux store initialization.
 * @param routes {JSX.Element} Routing components.
 * @param RootComponent {React.ComponentClass} Root component of the application. Default: App.
 *
 * @returns {React.ComponentClass} Root application with redux store and connected history.
 */
export const appFactory = (
    initStore: (history: History) => Store,
    routes: JSX.Element,
    RootComponent: React.ComponentClass = App,
): React.ComponentClass => {
    // Create history for redux-router.
    const history = createBrowserHistory();

    // Initialize Redux store.
    const store = initStore(history);

    // Set current language to <html> tag.
    setCurrentLanguageToHTMLAttribute();

    return class extends React.Component {
        public componentDidCatch(error: Error, info: React.ErrorInfo): void {
            // Log the error to an error reporting service
            logError(error, info);
        }

        public render(): JSX.Element {
            return (
                <Provider store={store}>
                    <ConnectedRouter history={history}>
                        <RootComponent>{routes}</RootComponent>
                    </ConnectedRouter>
                </Provider>
            );
        }
    };
};
