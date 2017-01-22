import {createStore} from 'redux'

import {getReducers} from './common'
import * as reducers from '../reducers'


export default function configureStore (initialState) {
    const store = createStore(
        getReducers(reducers),
        initialState,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextReducer = getReducers(require('../reducers'))
            store.replaceReducer(nextReducer)
        })
    }

    return store
}
