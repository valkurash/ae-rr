import * as React from 'react';

/**
 * Login application.
 */
export class App extends React.Component {
    public render(): JSX.Element {
        return <>{this.props.children}</>;
    }
}
