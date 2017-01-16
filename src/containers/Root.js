/**
 * Created by jd on 16/01/2017.
 */
import React, {Component, PropTypes} from 'react'
import {Provider} from 'react-redux'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'

import App from './App'
import MainMenu from './MainMenu'
import Game from './Game'

// load styles
import '../styles/main.scss'


class Root extends Component {
    static propTypes = {
        store: PropTypes.object
    }

    render () {
        const {store} = this.props
        const history = syncHistoryWithStore(browserHistory, store)
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Route path="/" component={App}>
                        <IndexRoute component={MainMenu} />
                        <Route path={'game'} component={Game} />
                        <Route path={'game'} component={Game} />
                    </Route>
                </Router>
            </Provider>
        )
    }
}


export default Root
