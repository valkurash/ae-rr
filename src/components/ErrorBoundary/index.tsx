import React from 'react';
import { Nullable } from '../../models';

import { logError } from '../../utils/error';

interface IState {
    /** JavaScript error object. */
    error: Nullable<Error>;

    /** Stacktrace information. */
    info: Nullable<React.ErrorInfo>;
}

/**
 * Wrapping class that catches unhandled JavaScript errors.
 * See https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html for more information.
 */
export class ErrorBoundary extends React.Component<{}, IState> {
    public state: IState = {
        error: null,
        info: null,
    };

    /**
     * Handles error.
     * @param {Error} error JavaScript Error object.
     * @param {React.ErrorInfo} info Stacktrace information.
     */
    public componentDidCatch(error: Error, info: React.ErrorInfo): void {
        // Display fallback UI
        this.setState({ error, info });
        // Log the error to an error reporting service
        logError(error, info);
    }

    public render(): React.ReactNode {
        return this.state.error ? (
            <div>
                <div>
                    <strong>Unknown error caught!</strong>
                </div>
                <div style={{ whiteSpace: 'pre-wrap' }}>{this.state.error.toString()}</div>
            </div>
        ) : (
            this.props.children
        );
    }
}
