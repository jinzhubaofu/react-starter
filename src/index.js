/**
 * @file index
 * @author leon<ludafa@outlook.com>
 */

/* eslint-disable fecs-min-vars-per-destructure, fecs-no-require */
/* eslint-disable no-inner-declarations */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const container = document.getElementById('app');

if (process.env.NODE_ENV === 'production') {
    ReactDOM.render(<App />, container);
}
else {
    const {AppContainer} = require('react-hot-loader');
    function render(App) {
        ReactDOM.render(
            <AppContainer>
                <App />
            </AppContainer>,
            container
        );
    }
    render(App);
    if (module.hot) {
        module.hot.accept('./App', () => render(App));
    }
}
