import {createStore} from 'redux'

import {getReducers} from './common'
import * as reducers from '../reducers'


export default function configureStore (initialState) {
    const store = createStore(
        getReducers(reducers),
        initialState
    )
    return store
}
