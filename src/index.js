/**
 * Created by jd on 16/07/16.
 */
import React from 'react'
import {render} from 'react-dom'
import {compose, createStore, applyMiddleware, combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import {AppContainer} from 'react-hot-loader'

import Root from './containers/Root'
import * as reducers from './reducers'


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

render(
    <AppContainer>
        <Root store={store} />
    </AppContainer>,
    document.getElementById('root')
)

if (module.hot) {
    module.hot.accept('./containers/Root', () => {
        render(
            <AppContainer
                component={require('./containers/Root').default}
                props={{store}}
            />,
            document.getElementById('root')
        )
    })
}
