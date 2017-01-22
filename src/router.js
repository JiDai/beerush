/**
 * Created by jd on 16/01/2017.
 */
import React from 'react'
import {Router, Route, IndexRoute} from 'react-router'

import App from './containers/App'
import MainMenu from './containers/MainMenu'
import Game from './containers/Game'


let getRouter = function (history) {
    return (
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={MainMenu} />
                <Route path={'game'} component={Game} />
            </Route>
        </Router>
    )
}

export default getRouter
