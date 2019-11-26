import * as React from 'react';

import { MenuLang } from 'components/MenuLang';
import { EMode } from 'components/MenuLang/enums';

/**
 * Login application.
 */
export class App extends React.Component {
    public render(): JSX.Element {
        return (
            <>
                <MenuLang mode={EMode.LOGIN} />
                {this.props.children}
            </>
        );
    }
}
