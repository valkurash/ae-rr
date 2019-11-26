import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';

import { EApp } from '../enums';

/**
 * Single-Spa lifecycle methods factory.
 *
 * @param app {EApp} Application to configure. There must be an element with the same identifier like `app` parameter in the index.html file.
 * @param rootComponent {React.ComponentClass} Root component to render.
 *
 * @returns Single-Spa lifecycle methods.
 */
export const singleSpaFactory = (app: EApp, rootComponent: React.ComponentClass) => {
    const reactLifecycles = singleSpaReact({
        React,
        ReactDOM,
        rootComponent,
        domElementGetter: () => document.getElementById(app.toString()) as Element,
    });
    return {
        bootstrap: [reactLifecycles.bootstrap],
        mount: [reactLifecycles.mount],
        unmount: [reactLifecycles.unmount],
    };
};
