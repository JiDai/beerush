/**
 * Created by jd on 16/07/16.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import {compose, createStore, applyMiddleware, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import {syncHistoryWithStore, routerReducer} from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'

import App from './containers/App'
import MainMenu from './containers/MainMenu'
import Game from './containers/Game'
import * as reducers from './reducers'

// load styles
import './styles/main.scss'


// Add the reducer to your store on the `routing` key
const store = createStore(
    combineReducers({
        ...reducers,
        routing: routerReducer
    }),
    compose(
        applyMiddleware(thunkMiddleware),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
)

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={MainMenu}/>
                <Route path={'game'} component={Game}/>
                <Route path={'game'} component={Game}/>
            </Route>
        </Router>
    </Provider>, document.getElementById('root')
)
