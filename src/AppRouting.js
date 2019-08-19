import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Router, Switch } from 'react-router';

import App from './containers/App';
import Game from './containers/Game';
import Home from './containers/Home';
import NotFound from './containers/NotFound';

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
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/game" component={Game} />
                        <Route exact path='*' component={NotFound} />
                    </Switch>
                </App>
            </Router>
        </ConnectedRouter>
    );
}

AppRouting.displayName = 'AppRouting';

export default AppRouting;
