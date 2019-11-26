import { ConnectedRouter } from 'connected-react-router';
import { EnzymePropSelector, mount, ReactWrapper } from 'enzyme';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';

/**
 * AsyncBoard configuration.
 */
interface IAsyncBoard {
    /** Board Tested board. */
    Board: React.ComponentType;

    /** Tested states. */
    states: any[];

    /** List of tests. */
    tests: ITestCommonAsyncBoard[];

    /** Description of test. */
    testDescription: string;

    /** History mock. */
    historyMock?: any;

    /** Board own props. */
    ownProps?: any;
}

/**
 * Nested component configuration.
 */
interface ITestCommonAsyncBoard {
    /** Description of test. */
    description: string;

    /** Component should be exist or not. */
    isExist: boolean;

    /** Component selector. */
    selector: EnzymePropSelector;

    /** Custom test function. */
    testFn?: (wrapper: ReactWrapper) => jest.ProvidesCallback;
}

/**
 * Testing standard board.
 */
export function testCommonAsyncBoard(options: IAsyncBoard): void {
    const { Board, states, tests, testDescription, historyMock = null, ownProps = null } = options;
    describe(testDescription, () => {
        states.forEach((state: any) => {
            const store = (configureMockStore as any)([createSagaMiddleware])(state);
            const wrapper = mount(
                <Provider store={store}>
                    <ConnectedRouter history={{ ...createBrowserHistory(), ...historyMock }}>
                        <Board {...ownProps} />
                    </ConnectedRouter>
                </Provider>,
            );

            tests.forEach(({ description, isExist = true, selector, testFn }) => {
                it(description, testFn ? testFn(wrapper) : () => expect(wrapper.find(selector).exists()).toEqual(isExist));
            });
        });
    });
}
