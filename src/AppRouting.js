import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Router } from 'react-router';

import App from './containers/App';
import Game from './containers/Game';
import MainMenu from './containers/MainMenu';

/**
 * Routing component.
 * @param  {Object} props Parent's props
 * @return {React.Component}
 */
export function AppRouting({ history }) {
    return (
        <ConnectedRouter history={history}>
            <Router history={history}>
                <App>
                    <Route exact path="/" component={MainMenu} />
                    <Route exact path="/game" component={Game} />
                </App>
            </Router>
        </ConnectedRouter>
    );
}

AppRouting.displayName = 'AppRouting';

export default AppRouting;
