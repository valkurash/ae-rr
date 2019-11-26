import * as React from 'react';

import { DEFAULT_PATH, TOKEN_NAME, TOKEN_REFRESH_NAME } from 'consts';
import { redirect } from 'utils/rest';

import { Loading } from '../Loading';

/** Logout component. */
export default class Logout extends React.Component<{}, {}> {
    public componentDidMount(): void {
        [TOKEN_NAME, TOKEN_REFRESH_NAME].forEach(k => localStorage.removeItem(k));
        redirect(DEFAULT_PATH);
    }

    public render(): JSX.Element {
        return <Loading />;
    }
}
